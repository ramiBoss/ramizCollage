from django.contrib import admin
from .models import Course, Student, Teacher, CourseRegistered, Logfile
# Register your models here.
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(CourseRegistered)
admin.site.register(Logfile)
