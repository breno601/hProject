import math
import requests

cuia_url = "https://customer-marketing-data.beerwulf.com/ap/"
epicampaign_url = "https://api.campaign.episerver.net/rest/22626318057/"

headers_cuia = {"Content-type": "application/json", "ApiKey": "eY2adMWzVKTeg2N9zgaga.oTu7xqgDoCyxQbJDeHkugohAiBi"}
headers_epicampaign = {"Content-type": "application/json", "Authorization": "Basic dGFyaWsua2lsaWNAYmVlcnd1bGYuY29tOlB0OFAhaE8wblp2QC5hcGkucHVycG9zZXMhY2FtcGFpZ24jYncyMDE"}


def get_subscribers_batch(recipient_list_id, row, status, batch_size):
    subscribers_path = epicampaign_url + "recipients/" + recipient_list_id + "?" + "offset=" + row + "&" + "limit=" + batch_size + "&" + "attributeNames=firstname%2Clastname%2Cmarket_code%2Clanguage%2Cmarket_code%2Cbirthday%2Csubowner%2Ccouponcode"
    resp = requests.get(subscribers_path, headers=headers_epicampaign)

    if resp.status_code != 200:
        print('Error with recipientListId {} and row {}. Status code: {} and error message: {}'.format(recipient_list_id, row, resp.status_code, resp.content))
        return

    json_data = resp.json()
    objects_to_send = []

    if json_data and 'elements' in json_data and 'count' in json_data:
        if json_data["count"] > 0:
            print("Batch with count: {}".format(json_data['count']))
            for element in json_data["elements"]:
                marketing_data = map_to_cuia(element, status)
                if marketing_data is not None and 'CouponCode' in marketing_data and marketing_data['CouponCode'] != "":
                    objects_to_send.append(marketing_data)

    return objects_to_send


def get_unsubscribers_batch(recipient_list_id, row, status, batch_size):
    subscribers_path = epicampaign_url + "unsubscribes/" + "?" + "offset=" + row + "&" + "limit=" + batch_size + "&" + "recipientListId=" + recipient_list_id
    resp = requests.get(subscribers_path, headers=headers_epicampaign)

    if resp.status_code != 200:
        print('Error with recipientListId {} and row {}. Status code: {} and error message: {}'.format(recipient_list_id, row, resp.status_code, resp.content))
        return

    json_data = resp.json()
    objects_to_send = []

    if json_data and 'elements' in json_data and 'count' in json_data:
        if json_data["count"] > 0:
            print("Batch with count: {}".format(json_data['count']))
            for element in json_data["elements"]:
                marketing_data = {
                    "Email": element["recipientId"],
                    "SubscriptionStatus": status,
                    "SubscriptionSource": 3
                }
                objects_to_send.append(marketing_data)

    return objects_to_send


def map_to_cuia(element, status):
    marketing_data = {}

    if element["id"] is None:
        raise Exception("missing Email!")
    else:
        marketing_data["Email"] = element["id"]


#    if "firstname"in element and element["firstname"] is not None:
#       marketing_data["FirstName"] = element["firstname"]

#    if "lastname"in element and element["lastname"] is not None:
#        marketing_data["LastName"] = element["lastname"]

#    if "birthday"in element and element["birthday"] is not None:
#        marketing_data["DateOfBirth"] = element["birthday"]

#    if "language"in element and element["language"][0:2] is not None:
#        marketing_data["LanguageCode"] = element["language"][0:2]

#    if "market_code"in element and element["market_code"][2:4] is not None:
#        marketing_data["CountryCode"] = element["market_code"][2:4]

#    if "market_code"in element and element["market_code"] is not None:
#        marketing_data["MarketCode"] = element["market_code"]

#    if "subowner"in element and element["subowner"] is not None:
#        if not element["subowner"] or element["subowner"] is False:
#            return None
#        marketing_data["SubOwner"] = element["subowner"]

    if "couponcode" in element and element["couponcode"] is not None:
        if not element["couponcode"] or element["couponcode"] == "":
            return None
        marketing_data["CouponCode"] = element["couponcode"]

#    marketing_data["SubscriptionStatus"] = status
#    marketing_data["SubscriptionSource"] = 3
#    marketing_data["IsEmailConfirmed"] = True

    return marketing_data


def send_batch_to_cuia(batch):
    bulk_url = cuia_url + "CustomerMarketingData/BulkInsert"
    resp = requests.post(bulk_url, json=batch, headers=headers_cuia)
    if resp.status_code != 200:
        print("Issue sending batch to CUIA. Action needed. Error code: {} Reason: {}".format(resp.status_code, resp.content))
        return

    print("Finished batch")


def perform_batch_update_for_subscribes(recipient_list_id, batch_size, status):
    count_url = epicampaign_url + "recipients/" + recipient_list_id + "/count"
    count = requests.get(count_url, headers=headers_epicampaign)
    count_data = count.json()
    total_processed = 0

    print("Starting batch processing for recipient list {}".format(recipient_list_id))
    if count_data and 'count' in count_data:
        total_count = count_data["count"]
        print("Processing {} subscribers".format(total_count))
        number_of_batches = total_count / batch_size

        for x in range(0, math.ceil(number_of_batches)):
            print("Getting batch number {}".format(x))
            next_batch_row = x * batch_size
            batch = get_subscribers_batch(recipient_list_id, str(next_batch_row), status, str(batch_size))
            if len(batch) > 0:
                send_batch_to_cuia(batch)
            total_processed += len(batch)
    else:
        raise Exception("Could not perform batch migration. Invalid count data.")

    print("Migration finished for recipient list {} Total users processed: {}".format(recipient_list_id, total_processed))


def perform_batch_update_for_unsubscribe(batch_size, status):
    count_url = epicampaign_url + "unsubscribes/count"
    count = requests.get(count_url, headers=headers_epicampaign)
    count_data = count.json()
    total_count = count_data["count"]
    total_processed = 0
    number_of_batches = total_count / batch_size

    for x in range(0, math.ceil(number_of_batches)):
            print("Getting batch number {}".format(x))
            next_batch_row = x * batch_size
            batch = get_unsubscribers_batch("226606510417", str(next_batch_row), status, str(batch_size))
            send_batch_to_cuia(batch)
            total_processed += len(batch)
    else:
        raise Exception("Could not perform unsubscribers batch migration. Invalid count data.")
    print("Migration (unsubscribers) finished for all lists. Total users processed: {}".format(total_processed))


#SUBSCRIBE MIGRATION
# Call below needs to run for following lists:
# 226263180574, 226606510416, 226606510417, 226606510418, 226606510419, 226606510434, 254867269479, 260664910265, 260664910266, 264092785914, 264092785915, 264092785916, 264092788035
perform_batch_update_for_subscribes("260664910266", 200, 1)

#UNSUBSCRIBE MIGRATION
# This one needs to run once
#perform_batch_update_for_unsubscribe(200, 2)  # This will run for all lists.

