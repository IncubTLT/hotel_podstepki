# import boto3
# from botocore.exceptions import ClientError
# from django.core.files.storage import Storage
# from django.conf import settings


# class VKCloudStorage(Storage):
#     def __init__(self, location=None, base_url=None):
#         self.client = boto3.client(
#             's3',
#             endpoint_url=settings.VK_STORAGE_ENDPOINT_URL,
#             aws_access_key_id=settings.VK_STORAGE_ACCESS_KEY,
#             aws_secret_access_key=settings.VK_STORAGE_SECRET_KEY,
#             region_name=settings.VK_STORAGE_REGION_NAME,
#             config=boto3.session.Config(signature_version='s3v4')
#         )
#         self.bucket_name = settings.VK_STORAGE_BUCKET_NAME
#         super().__init__()
#         self.base_url = base_url
#         self.location = location

#     def _open(self, name, mode='rb'):
#         response = self.client.get_object(Bucket=self.bucket_name, Key=name)
#         return response['Body']

#     def _save(self, name, content):
#         self.client.upload_fileobj(content, self.bucket_name, name)
#         return name

#     def exists(self, name):
#         try:
#             self.client.head_object(Bucket=self.bucket_name, Key=name)
#             return True
#         except Exception as e:
#             return False

#     def url(self, name):
#         return f"{settings.VK_STORAGE_ENDPOINT_URL}/{self.bucket_name}/{name}"

#     def delete(self, name):
#         self.client.delete_object(Bucket=self.bucket_name, Key=name)

#     def listdir(self, path):
#         result = self.client.list_objects_v2(Bucket=self.bucket_name, Prefix=path)
#         files = [obj['Key'] for obj in result.get('Contents', [])]
#         return files, []


#     #  Надо подумать какие ещё нужны методы Storage, например (size, path и т.д.)


# VKCloudStaticStorage = VKCloudStorage(location=settings.STATICFILES_LOCATION, base_url=settings.STATIC_URL)
# VKCloudMediaStorage = VKCloudStorage(location=settings.MEDIAFILES_LOCATION, base_url=settings.MEDIA_URL)
