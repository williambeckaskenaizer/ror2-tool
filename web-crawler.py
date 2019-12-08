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
    print("Getting Chests")
    """
    Scrapping this part. There are not enough chests or enough organized chest data to justify spending this much time
    on a function of this nature. Hand entering/updating this data will be easier. 
    """
    # chest_list = ["Barrel", "Equipment Barrel", "Cloaked Chest", "Chest", "Large Chest", "Legendary Chest", "Category Chest", "Lunar Pod", "Multishop Terminal", "Rusty Lockbox", "Timed Security Test"]
    # chest_gallery = requests.get("https://riskofrain2.fandom.com/wiki/Structures")
    # clean_chest_page = bs4.BeautifulSoup(chest_gallery.text, 'html.parser')

    with open('chests.csv', mode='w') as chest_file:
        # "Chest Name","Item type, Common Chance, Uncommon Chance, Legendary Chance" ,"Base Cost"
        chest_file.write("Barrel, Gold/XP, N/A, N/A, N/A, 0\n")
        chest_file.write("Equipment Barrel, Equipment, N/A, N/A, N/A, 25\n")
        chest_file.write("Cloaked Chest, Damage, Utility, Healing, White, Green, Red, 79.2, 19.8, 0.99, 0\n")
        chest_file.write("Chest, Damage, Utility, Healing, White, Green, Red, 79.2, 19.8, 0.99, 25\n")
        chest_file.write("Large Chest, Damage, Utility, Healing, Green, Red, 0, 80, 20, 50\n")
        chest_file.write("Legendary Chest, Damage, Utility, Healing, Red, 0, 0, 100, 3200\n")
        chest_file.write("Damage Chest, Damage, White, Green, Red, 79.2, 19.8, 0.99, 30\n")
        chest_file.write("Utility Chest, Utility, White, Green, Red,  79.2, 19.8, 0.99, 30\n")
        chest_file.write("Healing Chest, Healing, White, Green, Red, 79.2, 19.8, 0.99, 30\n")
        chest_file.write("Lunar Pod, Lundar, Lunar, N/A, N/A, N/A, 1\n")
        chest_file.write("Multishop Terminal, Damage, Utility, Healing, White, Green, Unknown, Unknown, Unkown, 30\n")
        chest_file.write("Rusty Lockbox, Damage, Utility, Healing, White, Green, Red, Unknown, Unknown, Unkown, 0\n")

    print("Done.. teehee")
            
def get_bosses():
    print("getting bosses")
    boss_gallery = requests.get("https://riskofrain2.fandom.com/wiki/Monsters")
    clean_boss_page = bs4.BeautifulSoup(boss_gallery.text, 'html.parser')
    attr_list = ["health", "damage", "speed", "armor"]

    bosses = clean_boss_page.find("div", id="gallery-1")
    boss_list = []

    for boss in bosses.stripped_strings:
        boss = re.sub(r"\s+", '_', boss)
        boss_list.append(boss)
        
    stat_list = []
    for boss in boss_list:
        stat_list.append(boss+",")
        for attr in attr_list:

            mon_url = requests.get("https://riskofrain2.fandom.com/wiki/" + boss)
            clean_mon_url = (bs4.BeautifulSoup(mon_url.text, 'html.parser'))
            sub_for_mon = clean_mon_url.find("div", {"data-source": attr})
            second_sub = sub_for_mon.find("div", {"class":"pi-data-value pi-font"})
            for i in second_sub.stripped_strings:
                if attr == "armor":
                    stat_list.append(i+"\n")
                else:
                    stat_list.append(i+",")
    with open('bosses.csv', mode='w') as boss_file:
        boss_file.write("Name,Health,Damage,Speed,Armor\n")
        for entry in stat_list:
            boss_file.write(entry)
    print("done")
def get_environments():
    print("Getting Environments")
    """
    it makes zero sense to scrape this from the web
    """
    # "Name","Sequence","Description"
    with open('environments.csv', mode='w') as environment_file:
        environment_file.write("Distant Roost, 1, Spires of earth jut through the fog and unknown avian creatures circle far peaks guarding their broods.\n")
        environment_file.write("Titanic Plains, 1, Gigantic stone arches bracket the skyline, while the main play-field overlooks a vast fractured tectonic lowland\n")
        environment_file.write("Wetland Aspect, 2, A moist mire that consists mostly of ruined stone structures and swampy areas filled with water.\n")
        environment_file.write("Abandoned Aqueduct, 2, An arid, sprawling desert located on Providence\n")
        environment_file.write("Rallypoint Delta, 3, Rallypoint Delta is a desolate tundra located on Providence\n")
        environment_file.write("Scorched Acres, 3, Burned ruins, comprised of many floating circular islands, which are connected by bridges and Gas Vents.\n")
        environment_file.write("Abyssal Depths, 4, This hellfire-forged zone is ocated within the crust of the planet.")
        environment_file.write("Siren's Call, 4, A Ship Graveyard, featuring long-abandoned ancient technologies.\n")
        environment_file.write("Bazaar Between Time, ???, Existing neither here nor there, this place is a hidden realm run by The Celestials.\n")
        environment_file.write("A Moment, Fractured, ???, A Hidden Realm, with multiple floating islands in the void. The last island contains the Obelisk.\n")
        environment_file.write("Gilded Coast, ???, A Hidden Realm featuring the boss Aurelionite.\n")
    print("Done... teehee")

def get_challenges():
    print("Getting Challenges")


def main():
    get_item_stats()
    get_enemies()
    get_chests()
    get_bosses()
    get_environments()

main()