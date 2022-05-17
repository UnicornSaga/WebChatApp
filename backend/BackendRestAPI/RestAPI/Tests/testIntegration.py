import email
from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from RestAPI.Models.Users import User
import datetime
import logging

logger = logging.getLogger(__name__)

class UserViewSetIntegrationTests(APITestCase):

    @classmethod
    def setUp(self):
        self.client = APIClient()
        self.access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpDNFV2Yzd1SE9tRnlNNVAyY2s0aiJ9.eyJpc3MiOiJodHRwczovL2Rldi1idmsweHgyay51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjI0OTY4ZmUzMDFjNTYwMDZhOTEyYzkyIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvIiwiaHR0cHM6Ly9kZXYtYnZrMHh4MmsudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY1MjcxNTI5NCwiZXhwIjoxNjUyODAxNjk0LCJhenAiOiI4dlNReUtyaTI5UklBMzBFNWlkRlFjN0pXS2l4eEN1cyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MifQ.W4LCZCy0tMB7gaHT7n1rRljykmL4e-5aoK74RkCAOn0FHmtIQrDDibit3low4AWULASWQUOBa8T87kXlWIF2lLA6LnNUZ78bqBxlt0RJo2rIKvVm_0Oqja97FCtUKRLpeXYF2HUbN6arSFsk3gtHtwBJe7IDa4I0fgaxPLm3EWLO3aiUA7TDIQNqgpKpP1FBGe0M2bcV5tHHbb6DoQFfaNN9suXTWwibSqeZOFA82tQv_dZ7uTrk-gCDD8OokfK7IBoIK_KvxTY4bbEHE8W1RSAalVWsitSBssA4cDU8TXYrsaahS6mX2KqHgIkoIxrHx1AMkMBLA3FO-HB2f7ma2g"
    
    
    def test_create_new_user(self):
        logger.debug("Creating new user")
        url = "http://localhost:8000/api/users/"
        data = {
            "email": "test123@gmail.com",
            "name": "Vuong Vu",
            "description": "Hello World",
            "age": 18,
            "friendlist": ['20020314@vnu.edu.vn'],
        }

        logger.debug("Sending new user data to {}, data: {}".format(url, data))
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response  = self.client.post(url, data)

        logger.debug("Testing status code response: %s, code: %d"%(response.json(), response.status_code))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        logger.debug("Testing new user object details")
        u = User.objects.get(email="test123@gmail.com")
        self.assertEqual(u.email, "test123@gmail.com")
        self.assertEqual(u.name, "Vuong Vu")
        self.assertEqual(u.description, "Hello World")
        self.assertEqual(u.age, 18)
        self.assertEqual(u.friendlist, ['20020314@vnu.edu.vn'])

        logger.debug("Test user create successfully")

    def test_fetch_user_by_email(self):
        url = "http://localhost:8000/api/users/"
        data = {
            "email": "test123@gmail.com",
            "name": "Vuong Vu",
            "description": "Hello World",
            "age": 18,
            "friendlist": ['20020314@vnu.edu.vn'],
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response  = self.client.post(url, data)

        logger.debug("Getting user by email")
        url = "http://localhost:8000/api/users/test123@gmail.com/"

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response = self.client.get(url)
        res = User.objects.get(email="test123@gmail.com")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(res.email, "test123@gmail.com")
        self.assertEqual(res.name, "Vuong Vu")
        self.assertEqual(res.description, "Hello World")
        self.assertEqual(res.age, 18)
        self.assertEqual(res.friendlist, ['20020314@vnu.edu.vn'])

        logger.debug("Fetch user by email successfully")

    def test_update_user_info(self):
        url = "http://localhost:8000/api/users/"
        data = {
            "email": "test123@gmail.com",
            "name": "Vuong Vu",
            "description": "Hello World",
            "age": 18,
            "friendlist": ['20020314@vnu.edu.vn'],
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response  = self.client.post(url, data)

        logger.debug('Starting test uddate persons')

        url = "http://localhost:8000/api/users/test123@gmail.com/"
        logger.debug('Sending TEST data to url: %s'%url)
        data = {
            "email": "test123@gmail.com",
            "name": "Mai Tuan",
            "description": "Hello World",
            "age": 18,
            "friendlist": ['vuongvu1208@gmail.com'],
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response = self.client.put(url, data)
        json = User.objects.get(email="test123@gmail.com")
        
        logger.debug('Testing to see if status code is correct')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        logger.debug('Testing modified person object details')
        self.assertEqual(json.email, "test123@gmail.com")
        self.assertEqual(json.name, "Mai Tuan")
        self.assertEqual(json.description, "Hello World")
        self.assertEqual(json.age, 18)
        self.assertEqual(json.friendlist, ['vuongvu1208@gmail.com'])

        logger.debug('Test person put completed successfully')


    def test_delete_user(self):
        url = "http://localhost:8000/api/users/"
        data = {
            "email": "test123@gmail.com",
            "name": "Vuong Vu",
            "description": "Hello World",
            "age": 18,
            "friendlist": ['20020314@vnu.edu.vn'],
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response  = self.client.post(url, data)

        logger.debug('Starting test delete persons')

        url = "http://localhost:8000/api/users/test123@gmail.com/"
        logger.debug('Sending TEST data to url: %s'%url)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response = self.client.delete(url)

        logger.debug('Testing to see if status code is correct')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)