#include <iostream>
#include <stdlib.h>
#include <cstring>

#define ASII 65

using namespace std;

int total_code_count=0;

char getCode(int num,int pos){
if(num==1 || num==0)
return num;
else
	return (char)(ASII+3*(num-2)+pos);
}

void findCode(int *phoneNum,char *result,int p_n_length,int curNum){
	if(curNum == p_n_length)
	{
		cout<<result<<endl;
		total_code_count++;
		return;
	}
	for(int i=0;i<3;i++){
		result[curNum]=getCode(phoneNum[curNum],i);
		findCode(phoneNum,result,p_n_length,curNum+1);
		if(phoneNum[curNum] == 1 || phoneNum[curNum] == 0)
		return;
	}
}


int main(){
	int num[]={1,3,4};
	char *result;
	int p_n_length=sizeof(num)/sizeof(int);
	result=(char *)malloc(p_n_length+1);
	findCode(num,result,p_n_length,0);
	cout<<"Total_Code_Count = "<<total_code_count;
	return 0;
}
