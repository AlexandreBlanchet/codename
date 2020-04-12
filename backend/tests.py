from django.test import TestCase
from django.contrib.auth.models import User

class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(username='test_user')


    def test_user_creation(self):
        user = User.objects.get(username='test_user')
        self.assertEqual(user.username,'test_user')