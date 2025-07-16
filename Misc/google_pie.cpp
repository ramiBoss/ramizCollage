#include <iostream>
#include <stdio.h>

using namespace std;

int collect(int *pie,int min){
	int sum=0;
	for(int i=0;i<4;i++)
		sum=sum+(pie[i]/min);
	return sum;
}

int main(){
	int pie[]={8,15,12,10};
	int people=15;
	int min=8;
	while(min>0){
		if(collect(pie,min) >= people){
			cout<<min;
			return 0;
		}
		else
			min=min/2;
	}
	if(min == 0)
		cout<<0;
	return 0;	
}
