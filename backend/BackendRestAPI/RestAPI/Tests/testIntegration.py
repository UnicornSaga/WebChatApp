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


    #Test creating new user
    def test_create_user(self):
        logger.debug("Starting test create person")
        url = "http://localhost:8000/api/users/"
        data = {
            "email": "test123@gmail.com",
            "name": "Vuong Vu",
            "description": "Hello World",
            "age": 18,
            "friendlist": ['vuongvu1208@gmail.com'],
        }

        logger.debug("Sending TEST data to url: %s, data: %s"%(url, data))
        response = self.cleint.post(url, data, format='json')
        
        logger.debug("Testing status code response: %s, code: %d"%(response.json(), response.status_code))
        self.assertEqual(response.stati_code, status.HTTP_201_CREATED)

        logger.debug("Testing peron count")
        self.assertEqual(User.objects.count(), 1)

        logger.debug("Testing new user object details")
        u = User.object.get()
        self.assertEqual(u.email, "test123@gmail.com")
        self.assertEqual(u.name, "Vuong Vu")
        self.assertEqual(u.description, "Hello World")
        self.assertEqual(u.age, 18)
        self.assertEqual(u.friendlist, ['vuongvu1208@gmail.com'])

        logger.debug("Test user create successfully")

    # Test to list all users in database
    def test_list_users(self):
        logger.debug("Starting test list persons")
        self.add_test_user()

        url = "http://localhost:8000/api/users/"
        logger.debug("Sending TEST data to url: %s" %url)
        response = self.client.get(url, format='json')
        json = response.json()

        logger.debug("Testing status code response: %s, code: %d" %(json, response.status_code))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        logger.debug("Testing result count")
        self.assertEqual(len(json), 1)

    

    def test_list_user_by_email(self):
        logger.debug("Starting test fetch user by email")

        self.add_test_person()

        url = "http://localhost:8000/api/users/abcxyz@gmail.com/"
        logger.debug("Sending GET to user")
        response = self.client.get(url, format='json')

        logger.debug("Testing to see if status code is correct")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        logger.debug("Testing to check user info")
        u = User.object.get()
        self.assertEqual(u.email, "abcxyz@gmail.com")
        self.assertEqual(u.name, "Vuong Vu")
        self.assertEqual(u.description, "Hello World")
        self.assertEqual(u.age, 18)
        self.assertEqual(u.friendlist, ['vuongvu1208@gmail.com'])

        logger.debug("Testing GET by email successfully")


    # Test update user
    def test_put_persons(self):
        logger.debug('Starting test put persons')

        self.add_test_person()

        url = "http://localhost:8000/api/users/abcxyz@gmail.com/"
        logger.debug('Sending TEST data to url: %s'%url)
        data = {
            "email": "test123@gmail.com",
            "name": "Vuong Vu",
            "description": "Hello World",
            "age": 18,
            "friendlist": ['vuongvu1208@gmail.com'],
        }

        response = self.client.put(url, data, format='json')
        json = response.json()
        
        logger.debug('Testing to see if status code is correct')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        logger.debug('Testing modified person object details')
        u = User.object.get()
        self.assertEqual(u.email, "test123@gmail.com")
        self.assertEqual(u.name, "Vuong Vu")
        self.assertEqual(u.description, "Hello World")
        self.assertEqual(u.age, 18)
        self.assertEqual(u.friendlist, ['vuongvu1208@gmail.com'])

        logger.debug('Test person put completed successfully')


    # Test user delete
    def test_delete_persons(self):
        logger.debug('Starting test delete persons')

        self.add_test_person()

        url = "http://localhost:8000/api/users/abcxyz@gmail.com/"
        logger.debug('Sending TEST data to url: %s'%url)
        response = self.client.delete(url, format='json')

        logger.debug('Testing to see if status code is correct')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)