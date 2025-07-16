from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import Course

def display_courses(request):
    crs_data = Course.objects.all()
    return render(request, 'clgmng/courses.html', {'data' : crs_data })
