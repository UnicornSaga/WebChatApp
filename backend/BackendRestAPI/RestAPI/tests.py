from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from RestAPI.Models.Users import User
import datetime
import logging

logger = logging.getLogger(__name__)

class UserViewSetTests(APITestCase):

    # Add test user into database
    def add_test_user(self):
        logger.debug("Adding a new user into database")
        u = User("abcxyz@gmail.com", "Vuong Vu", "HelloWorld", 18, ["vuongvu1208@gmail.com", "20020314@vnu.edu.vn"])
        u.save()
        logger.debug("Successfully added test user into database")


    # Test to list all users in database
    def test_list_users(self):
        logger.debug("Starting test list persons")
        self.add_test_user()

        url = "http://localhost:8000/"
        logger.debug("Sending TEST data to url: %s" %url)
        response = self.client.get(url, format='json')
        json = response.json()

        logger.debug("Testing status code response: %s, code: %d" %(json, response.status_code))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        logger.debug("Testing result count")
        self.assertEqual(len(json), 1)