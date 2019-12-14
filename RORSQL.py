from flask import Flask
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
import csv

engine = create_engine('mysql+pymysql://root:megainterface97@127.0.0.1:3306/ror2')
metadata = MetaData(bind = engine)
connection = engine.connect()
item_table = Table("item", metadata, autoload = True, autoload_with = engine)
enemy_table = Table("enemy", metadata, autoload = True, autoload_with = engine)
boss_table = Table("boss", metadata, autoload = True, autoload_with = engine)
challenge_table = Table("challenge", metadata, autoload = True, autoload_with = engine)
chest_table = Table("chest", metadata, autoload = True, autoload_with = engine)
environment_table = Table("environment", metadata, autoload = True, autoload_with = engine)
survivor_table = Table("survivor", metadata, autoload = True, autoload_with = engine)
item_chest_table = Table("item_chest", metadata, autoload = True, autoload_with = engine)
item_unlock_table = Table("item_unlock",  metadata, autoload = True, autoload_with = engine)
ability_unlock_table = Table("ability_unlock",  metadata, autoload = True, autoload_with = engine)
survivor_unlock_table = Table("survivor_unlock",  metadata, autoload = True, autoload_with = engine)
Session = sessionmaker(bind=engine)
session = Session()

    
with open("items.csv", "r") as item_file:
    item_reader = csv.reader(item_file, delimiter=",")
    line_count = 0
    insert_query = item_table.insert()
    for row in item_reader:
        if line_count == 0:
            line_count = 0
        else:
            session.execute(insert_query, [{"item_id": line_count, "item_name": row[0], "item_rarity": row[1], "item_effect" : row[2], "item_type": row[3], "item_unlocked": row[4]}])
        line_count += 1

with open("enemies.csv", "r") as enemy_file:
    enemy_reader = csv.reader(enemy_file, delimiter = ",")
    line_count = 0
    insert_query = enemy_table.insert()
    for row in enemy_reader:
        if line_count == 0:
            line_count = 0
        else:
            session.execute(insert_query, [{"enemy_id" : line_count, "enemy_name" : row[0], "enemy_health": row[1], "enemy_attack": row[2], "enemy_speed": row[3]}])
        line_count += 1

with open("bosses.csv", "r") as boss_file:
    boss_reader = csv.reader(boss_file, delimiter = ",")
    line_count = 0
    insert_query = boss_table.insert()
    for row in boss_reader:
        if line_count == 0:
            line_count = 0
        else:
            session.execute(insert_query, [{"boss_id" : line_count, "boss_name" : row[0], "boss_health": row[1], "boss_attack": row[2], "boss_speed": row[3], "boss_armor": row[4]}])
        line_count += 1

with open("survivors.csv", "r") as survivor_file:
    survivor_reader = csv.reader(survivor_file, delimiter = ",")
    line_count = 0
    insert_query = survivor_table.insert()
    for row in survivor_reader:
        if line_count == 0:
            line_count = 0
        else:
            session.execute(insert_query, [{"survivor_id" : line_count, "survivor_name" : row[0], "survivor_health": row[1], "survivor_regen": row[2], "survivor_damage": row[3], "survivor_speed": row[4], "survivor_armor": row[5]}])
        line_count += 1

with open("environments.csv", "r") as environ_file:
    environ_reader = csv.reader(environ_file, delimiter = ",")
    line_count = 0
    insert_query = environment_table.insert()
    for row in environ_reader:
        if line_count == 0:
            line_count = 0
        else:
            session.execute(insert_query, [{"environment_id" : line_count, "environment_name" : row[0], "stage_number": row[1], "environment_description": row[2]}])
        line_count += 1

with open("chests.csv", "r") as chest_file:
    chest_reader = csv.reader(chest_file, delimiter = ",")
    line_count = 0
    insert_query = chest_table.insert()
    for row in chest_reader:
        if line_count == 0:
            line_count = 0
        else:
            session.execute(insert_query, [{"chest_id" : line_count, "chest_name" : row[0], "chest_item_type": row[1], "chest_possible_rarity": row[2], "chest_white_chance": row[3], "chest_green_chance": row[4], "chest_red_chance": row[5], "chest_base_cost": row[6]}])
        line_count += 1

with open("challenges.csv", "r") as challenge_file:
    challenge_reader = csv.reader(challenge_file, delimiter = ",")
    line_count = 0
    insert_query = challenge_table.insert()
    for row in challenge_reader:
        if line_count == 0:
            line_count = 0
        else:
            session.execute(insert_query, [{"challenge_id" : line_count, "challenge_name" : row[0], "challenge_desc": row[1], "challenge_unlock": row[2]}])
        line_count += 1
session.commit()


items = Table('item', metadata, autoload = True, autoload_with = engine)
item_query = select([items.columns.item_id, items.columns.item_rarity, items.columns.item_type])
chests = Table('chest', metadata, autoload = True, autoload_with = engine)
result = connection.execute(item_query)
item_result_list = result.fetchall()
chest_query = select([chests.columns.chest_id, chests.columns.chest_item_type, chests.columns.chest_white_chance, chests.columns.chest_green_chance, chests.columns.chest_red_chance])
result = connection.execute(chest_query)
chest_result_list = result.fetchall()
insert_query = item_chest_table.insert()
for i in item_result_list:
    if i[1] == "Common":
        for c in chest_result_list:
            if c[2] != 0:
                if c[1] == "Damage/ Utility/ Healing":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Damage" and i[2] == "Damage":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Utility" and i[2] == "Utility":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Healing" and i[2] == "Healing":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
    if i[1] == "Uncommon":
        for c in chest_result_list:
            if c[3] != 0:
                if c[1] == "Damage/ Utility/ Healing":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Damage" and i[2] == "Damage":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Utility" and i[2] == "Utility":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Healing" and i[2] == "Healing":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}]) 
    if i[1] == "Legendary":
        for c in chest_result_list:
            if c[4] != 0:
                if c[1] == "Damage/ Utility/ Healing":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Damage" and i[2] == "Damage":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Utility" and i[2] == "Utility":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}])
                elif c[1] == "Healing" and i[2] == "Healing":
                    session.execute(insert_query, [{"item_id": i[0], "chest_id": c[0]}]) 
    if i[1] == "Lunar" or i[1] == "Lunar Equipment":
        session.execute(insert_query, [{"item_id": i[0], "chest_id": 10}])
    if i[1] == "Equipment":
        session.execute(insert_query, [{"item_id": i[0], "chest_id": 2}])


challenges = Table("challenge", metadata, autoload = True, autoload_with = engine)
survivors = Table("survivor", metadata, autoload = True, autoload_with = engine)
challenge_query = select([challenges.columns.challenge_id, challenges.columns.challenge_unlock])
item_query = select([items.columns.item_id, items.columns.item_name])
survivor_query = select([survivors.columns.survivor_id, survivors.columns.survivor_name])
result = connection.execute(challenge_query)
challenge_result = result.fetchall()
result = connection.execute(item_query)
item_result_list = result.fetchall()
result = connection.execute(survivor_query)
survivor_result = result.fetchall()
for c in challenge_result:
    if c[0] > 0 and c[0] < 8:
        for s in survivor_result:
            if s[1] == c[1]:
                insert_query = survivor_unlock_table.insert()
                session.execute(insert_query, [{"challenge_id": c[0], "survivor_id": s[0]}])
                update_challenge = update(challenges).where(challenges.columns.challenge_id == c[0]).values(unlock_type = "Survivor")
                session.execute(update_challenge)
    if c[0] > 7 and c[0] < 46:
        for item in item_result_list:
            if item[1] == c[1]:
                insert_query = item_unlock_table.insert()
                session.execute(insert_query, [{"challenge_id": c[0], "item_id": item[0]}])
                update_challenge = update(challenges).where(challenges.columns.challenge_id == c[0]).values(unlock_type = "Item")
                session.execute(update_challenge)
    if c[0] > 45:
        update_challenge = update(challenges).where(challenges.columns.challenge_id == c[0]).values(unlock_type = "Ability")
        session.execute(update_challenge)
session.commit()
