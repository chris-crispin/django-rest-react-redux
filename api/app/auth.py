from api.app.serializers import UserSerializer

def jwt_response_payload_handler(token, user, request):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
