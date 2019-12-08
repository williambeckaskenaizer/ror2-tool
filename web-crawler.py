import requests, bs4, re, time, csv

"""
Welcome to the world's shoddiest web scraper :)

this was made to rip data from the ROR2 wikia,
as it is currently the most complete source for
info on Risk of Rain 2. 

As I was unable to locate decent documentation for the api to return
wikia pages as json objects (if it even still exists), 
this script parses HTML for the data required.

What terrifies me the most, is that it is entirely
build around the current structure of the wiki.
should that change at any time, all will be lost.

- Will
"""

"""
item list:

item id
name
rarity
description
unlocked by
category
"""


# def get_item_list(rarity):
    

def get_item_stats():
    #declare final item list this will return
    final_items = []
    # get html for page with list of items, clean it up
    items_page = requests.get("https://riskofrain2.fandom.com/wiki/Items")
    clean_items_page = bs4.BeautifulSoup(items_page.text, 'html.parser')
    #commons
    rarity_count = 0
    for item in clean_items_page:
        #regex for finding item name
        item_table = clean_items_page.select("table")[rarity_count]
        item_r = re.compile(r'<td data-sort-value="(.*?)">')
        items = item_r.findall(str(item_table))
        rarity_count+=1
        for i in items:
            if rarity_count is not 4:
                i = re.sub(r"[\s]", '_', i)
                final_items.append(i)
    print("getting items")
    attrs = ["desc", "rarity", "category", "unlock"]
    with open('items.csv', mode='w') as item_file:
        item_file.write("Name,Rarity,Description,Category,Unlocked By\n")
        for item in final_items:
            item_file.write(item + ",")
            item_page = requests.get('https://riskofrain2.fandom.com/wiki/' + item)
            clean_item_page = bs4.BeautifulSoup(item_page.text, 'html.parser')
            i_name =""
            i_desc = ""
            i_rarity = ""
            i_cat = ""
            i_unlock = ""
            for attr in attrs:
                item_attr = clean_item_page.find("div", {"data-source": attr})
                if item_attr:
                    ref_item_attr = item_attr.find("div", {"class": "pi-data-value pi-font"})
                else:
                    i_unlock="Default"
                
                if ref_item_attr:
                    if attr == "desc":
                        for i in ref_item_attr.stripped_strings:
                            i_desc+=i+" "
                    if attr == "rarity":
                        for i in ref_item_attr.stripped_strings:
                            i_rarity=i
                    if attr == "category":
                        for i in ref_item_attr.stripped_strings:
                            i_cat=i
                    if attr == "unlock":
                        for i in ref_item_attr.stripped_strings:
                            if i == "Damage" or i == "Healing" or i == "Utility":
                                unlock="Default"
                            else:
                                i_unlock=i
            item_file.write(i_rarity+ "," + "\"" +i_desc + "\"" +"," + i_cat + "," + i_unlock + "\n")
    print("done")

"""

enemy list time!
we need:

enemy name
health
damage
speed

"""

def get_enemies():
    print("getting enemies")
    mon_gallery = requests.get("https://riskofrain2.fandom.com/wiki/Monsters")
    clean_mon_page = bs4.BeautifulSoup(mon_gallery.text, 'html.parser')
    attr_list = ["health", "damage", "speed"]

    mons = clean_mon_page.find("div", id="gallery-0")
    mon_list = []

    for monster in mons.stripped_strings:
        monster = re.sub(r"\s+", '_', monster)
        mon_list.append(monster)
        
    stat_list = []
    for monster in mon_list:
        stat_list.append(monster+",")
        for attr in attr_list:

            mon_url = requests.get("https://riskofrain2.fandom.com/wiki/" + monster)
            clean_mon_url = (bs4.BeautifulSoup(mon_url.text, 'html.parser'))
            sub_for_mon = clean_mon_url.find("div", {"data-source": attr})
            second_sub = sub_for_mon.find("div", {"class":"pi-data-value pi-font"})
            for i in second_sub.stripped_strings:
                if attr == "speed":
                    stat_list.append(i+"\n")
                else:
                    stat_list.append(i+",")
    with open('enemies.csv', mode='w') as enemy_file:
        enemy_file.write("Name,Health,Damage,Speed\n")
        for entry in stat_list:
            enemy_file.write(entry)
    print("done")

"""
CHESTS:

Name
"Chest Name","Item type", "Common Chance", "Uncommon Chance", "Legendary Chance" ,"Base Cost"

"""

def get_chests():
    chest_list = ["Barrel", "Equipment Barrel", "Cloaked Chest", "Chest", "Large Chest", "Legendary Chest", "Category Chest", "Lunar Pod", "Multishop Terminal", "Rusty Lockbox", "Timed Security Test"]
    chest_gallery = requests.get("https://riskofrain2.fandom.com/wiki/Structures")
    clean_chest_page = bs4.BeautifulSoup(chest_gallery.text, 'html.parser')

    for chest in chest_list:
        print("looking for", chest)
        chest_page = requests.get("https://riskofrain2.fandom.com/wiki/"+chest)
        cleaned = bs4.BeautifulSoup(chest_page.text, 'html.parser')

        common_chance = ""
        uncommon_chance = ""
        legendary_chance = ""

        search = cleaned.find("p")
        search2 = search.find()
        for i in search.stripped_strings:
            print(i)






def main():
    # get_item_stats()
    # get_enemies()
    get_chests()

main()