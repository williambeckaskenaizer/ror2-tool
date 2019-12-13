from flask import Flask
from sqlalchemy import create_engine, Table, Column, Integer, MetaData
from sqlalchemy.orm import sessionmaker
import csv

engine = create_engine('mysql+pymysql://root:Shacoftw1@127.0.0.1:3306/ror2')
metadata = MetaData(bind = engine)

item_table = Table("item", metadata, autoload = True, autoload_with = engine)
enemy_table = Table("enemy", metadata, autoload = True, autoload_with = engine)
boss_table = Table("boss", metadata, autoload = True, autoload_with = engine)
challenge_table = Table("challenge", metadata, autoload = True, autoload_with = engine)
chest_table = Table("chest", metadata, autoload = True, autoload_with = engine)
environment_table = Table("environment", metadata, autoload = True, autoload_with = engine)
survivor_table = Table("survivor", metadata, autoload = True, autoload_with = engine)
Session = sessionmaker(bind=engine)
session = Session()
# with open("items.csv", "r") as item_file:
#     item_reader = csv.reader(item_file, delimiter=",")
#     line_count = 0
#     insert_query = item_table.insert()
#     for row in item_reader:
#         if line_count == 0:
#             line_count = 0
#         else:
#             session.execute(insert_query, [{"item_id": line_count, "item_name": row[0], "item_rarity": row[1], "item_effect" : row[2], "item_type": row[3], "item_unlocked": row[4]}])
#         line_count += 1

# with open("enemies.csv", "r") as enemy_file:
#     enemy_reader = csv.reader(enemy_file, delimiter = ",")
#     line_count = 0
#     insert_query = enemy_table.insert()
#     for row in enemy_reader:
#         if line_count == 0:
#             line_count = 0
#         else:
#             session.execute(insert_query, [{"enemy_id" : line_count, "enemy_name" : row[0], "enemy_health": row[1], "enemy_attack": row[2], "enemy_speed": row[3]}])
#         line_count += 1

# with open("bosses.csv", "r") as boss_file:
#     boss_reader = csv.reader(boss_file, delimiter = ",")
#     line_count = 0
#     insert_query = boss_table.insert()
#     for row in boss_reader:
#         if line_count == 0:
#             line_count = 0
#         else:
#             session.execute(insert_query, [{"boss_id" : line_count, "boss_name" : row[0], "boss_health": row[1], "boss_attack": row[2], "boss_speed": row[3], "boss_armor": row[4]}])
#         line_count += 1

# with open("survivors.csv", "r") as survivor_file:
#     survivor_reader = csv.reader(survivor_file, delimiter = ",")
#     line_count = 0
#     insert_query = survivor_table.insert()
#     for row in survivor_reader:
#         if line_count == 0:
#             line_count = 0
#         else:
#             session.execute(insert_query, [{"survivor_id" : line_count, "survivor_name" : row[0], "survivor_health": row[1], "survivor_regen": row[2], "survivor_damage": row[3], "survivor_speed": row[4], "survivor_armor": row[5]}])
#         line_count += 1

# with open("environments.csv", "r") as environ_file:
#     environ_reader = csv.reader(environ_file, delimiter = ",")
#     line_count = 0
#     insert_query = environment_table.insert()
#     for row in environ_reader:
#         if line_count == 0:
#             line_count = 0
#         else:
#             session.execute(insert_query, [{"environment_id" : line_count, "environment_name" : row[0], "stage_number": row[1], "environment_description": row[2]}])
#         line_count += 1

# with open("chests.csv", "r") as chest_file:
#     chest_reader = csv.reader(chest_file, delimiter = ",")
#     line_count = 0
#     insert_query = chest_table.insert()
#     for row in chest_reader:
#         if line_count == 0:
#             line_count = 0
#         else:
#             session.execute(insert_query, [{"chest_id" : line_count, "chest_name" : row[0], "chest_item_type": row[1], "chest_possible_rarity": row[2], "chest_white_chance": row[3], "chest_green_chest": row[4], "chest_red_chance": row[5], "chest_base_cost": row[6]}])
#         line_count += 1
session.commit()