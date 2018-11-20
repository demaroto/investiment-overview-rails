class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
      if user.kind == 'admin'
        can :manage, :all
        return unless user.kind == 'admin'
      else
      cannot :access, :rails_admin  
      end
    
    

  end
end
