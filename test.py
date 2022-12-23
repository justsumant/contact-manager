
Suman Sah
  4:12 PM
ok


Suman Sah
  8:44 AM
https://docs.google.com/document/d/1DS_w4d4zEGcN8P355Kk_1h5OQFuADFQezQo5jUqI6AY/edit?usp=sharing
G Suite Document
 

html basics course outlines
Google Doc
New


Suman Sah
  8:51 AM
from . models import ContactModel
from . serializers import ContactSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
# Create your views here.


class ContactViewSet(viewsets.ViewSet):
    def list(self, request):
        con = ContactModel.objects.all()
        serializer = ContactSerializer(con, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        id = pk
        if id is not None:
            stu = ContactModel.objects.get(id=id)
            serializer = ContactSerializer(stu)
            return Response(serializer.data)

    def create(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data Created'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        id = pk
        con = ContactModel.objects.get(id=id)
        serializer = ContactSerializer(con, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data updated'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        id = pk
        stu = ContactModel.objects.get(pk=id)
        stu.delete()
        return Response({'msg': 'Data Deleted'})