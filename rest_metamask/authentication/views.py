from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class IsUserAuthenticated(APIView):
    """check if user is authenticated"""
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        return Response({'auth': True})
