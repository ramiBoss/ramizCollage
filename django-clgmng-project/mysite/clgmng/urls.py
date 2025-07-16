from django.conf.urls import url
from . import views, homes, course
urlpatterns = [
	url(r'^$',views.index, name='index'),
    url(r'^std_reg/$',views.Reg_Student, name='Reg_Student'),
    url(r'^tec_reg/$',views.Reg_Teacher, name='Reg_Teacher'),
    url(r'^std_login/$',views.Login_Student, name='Login_Student'),
    url(r'^tec_login/$',views.Login_Teacher, name='Login_Teacher'),
	url(r'^courses/$',course.display_courses, name='display_courses'),
	url(r'^std_home/$',homes.student_home, name='student_home'),
	url(r'^tec_home/$',homes.teacher_home, name='teacher_home'),
	url(r'^logout/$',log.logout, name='logout'),
	url(r'^course_reg/$',homes.course_register, name='course_register'),
	]
