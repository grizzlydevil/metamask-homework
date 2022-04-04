from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class IsUserAuthenticated(APIView):
    """check if user is authenticated"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


    def get(self, request, format=None):
        return Response({'auth': True})
