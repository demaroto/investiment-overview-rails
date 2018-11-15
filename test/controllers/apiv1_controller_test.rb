require 'test_helper'

class Apiv1ControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get apiv1_index_url
    assert_response :success
  end

end
