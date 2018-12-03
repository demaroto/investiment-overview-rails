# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_03_064549) do

  create_table "contatos", force: :cascade do |t|
    t.string "nome"
    t.string "email"
    t.text "mensagem"
    t.integer "pontuacao"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.text "content"
    t.integer "visualized", default: 0
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "pairs", force: :cascade do |t|
    t.string "pair_id"
    t.string "type_trade"
    t.string "price"
    t.integer "user_id"
    t.string "pair_name"
    t.index ["user_id"], name: "index_pairs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "kind", default: "common"
    t.string "nome"
    t.integer "pair_id"
    t.string "image"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["pair_id"], name: "index_users_on_pair_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
