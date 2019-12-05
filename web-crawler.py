import requests, bs4, re, time

"""
let's make a python scraper for https://riskofrain2.fandom.com/wiki/Risk_of_Rain_2_Wiki

info we need

ITEMS:
item id
name
rarity
description
unlocked by
category


"""

def get_item_list(rarity):
    #declare final item list this will return
    final_items = []

    # get html for page with list of items, clean it up
    items_page = requests.get("https://riskofrain2.fandom.com/wiki/Items")
    clean_items_page = bs4.BeautifulSoup(items_page.text, 'html.parser')

    #commons
    for item in clean_items_page:

        #regex for finding item name
        common_item_table = clean_items_page.select("table")[0]
        item_r = re.compile(r'<td data-sort-value="(.*?)">')
        items = item_r.findall(str(common_item_table))
    for i in items:
        i = re.sub(r"[\s]", '_', i)
        final_items.append(i)
            

    return final_items
        


def get_item_stats(i_list):
    for item in i_list:
        print("for ", item, ":")
        item_page = requests.get('https://riskofrain2.fandom.com/wiki/' + item)
        clean_item_page = bs4.BeautifulSoup(item_page.text, 'html.parser')
        item_rarity = re.compile(r'href="/wiki/Items#Common" title="Items">(.*?)<')
        item_cat = re.compile(r'title="Category:(.*?)Items')
        item_unlock = re.compile(r'"pi-data-value pi-font"><a href="/wiki/(.*?)"')

        rarity = item_rarity.findall(str(clean_item_page))[0]
        category = item_cat.findall(str(clean_item_page))[0]

        if "Unlock" in clean_item_page.stripped_strings:
            oof = item_unlock.findall(str(clean_item_page), re.DOTALL)[2]
            unlock = re.sub("[^a-zA-Z\s_]", "", oof)
        else:
            unlock = "Default"

        
        print(rarity, category, unlock)

i_list = get_item_list("common")
print(i_list)
get_item_stats(i_list)

# def get_items():
#     page = requests.get("https://riskofrain2.fandom.com/wiki/Items")
#     clean_page = bs4.BeautifulSoup(page.text, 'html.parser')

#     f = open("items.txt","a")

#     for i in range(0,5):
#         table = clean_page.select("table")[i]
#         item_r = re.compile(r'<td data-sort-value=(.*?)>')
#         cleanr = re.compile(r'<.*?>')
#         cleantext = re.sub(cleanr, "", str(table))
#         if i == 0:
#             items = item_r.findall(str(table))
#             f.write("\nCommon Items:"+cleantext)
#         if i == 1:
#             items = item_r.findall(str(table))
#             f.write("\n\nUncommon:"+cleantext)
#         if i == 2:
#             items = item_r.findall(str(table))
#             f.write("\n\nLegendary:"+cleantext)
#         if i == 3:
#             boss_item_r = re.compile(r'<td data-sort-value=(".*?")>')
#             items = boss_item_r.findall(str(table))
#             items = items[::2]
#             f.write("\n\nBoss:"+cleantext)
#         if i == 4:
#             items = item_r.findall(str(table))
#             f.write("\n\nWunar:"+cleantext)
#     f.close()

# def get_enemies():
#     f = open("enemies.txt", "a")
#     mon_gallery = requests.get("https://riskofrain2.fandom.com/wiki/Monsters")
#     clean_page = bs4.BeautifulSoup(mon_gallery.text, 'html.parser')
#     attr_list = ["health", "damage", "speed"]

#     mons = clean_page.find("div", id="gallery-0")
#     mon_list = []

#     for monster in mons.stripped_strings:
#         monster = re.sub(r"\s+", '_', monster)
#         mon_list.append(monster)

#     for monster in mon_list:
#         for attr in attr_list:
#             f.write(get_attr(monster + ",", attr)+"\n")
#     f.close()

# def get_attr(mon, attr):
#     mon_url = requests.get("https://riskofrain2.fandom.com/wiki/" + mon)
#     clean_mon_url = (bs4.BeautifulSoup(mon_url.text, 'html.parser'))
#     t = clean_mon_url.find("div", {"data-source": attr})
#     t2 = t.find("div", {"class":"pi-data-value pi-font"})
#     leest = []
#     for i in t2.stripped_strings:
#         leest.append(i)
#     stwing = (mon+","+attr+","+str(leest))
#     return stwing
    




# get_enemies()
# get_items()