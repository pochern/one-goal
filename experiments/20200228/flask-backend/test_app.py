from app import get_data
def test_get_data():
    x = get_data()
    assert 'name' in x
