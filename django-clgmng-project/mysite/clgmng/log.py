from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .forms import Student_Reg, Teacher_Reg, Student_Login, Teacher_Login
from django import forms
from .models import Student, Teacher

def logout(request):
    try:
        if request.session['enum']:
            del request.session['enum']
        if request.session['empid']:
            del request.session['empid']
    except KeyError:
        pass
    return render(request, 'clgmng/index.html')
