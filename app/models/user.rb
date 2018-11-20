class User < ApplicationRecord
  require 'carrierwave/orm/activerecord'
  has_many :message
  has_many :pairs
  mount_uploader :image, ImageUploader
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
