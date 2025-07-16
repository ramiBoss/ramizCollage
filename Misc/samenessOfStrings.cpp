#include<iostream>
#include<stdlib.h>
#include <string>


char check(std::string st1,std::string st2){
	int i;
	for(i=0;i<st1.size();i++){
		if(st1.at(i)!=st2.at(i))
		return st2.at(i);
	}

}

std::string move(int i,int j,std::string st1,char pick){
	//j=i-1;
	while(i>=0){
	st1[i]=st1[j];
	j--;
	i--;
	}
	st1[0]=pick;
	return st1;
}

int transform(std::string str1,std::string str2){
	int i,j,count=0;
	char pick;

	while(str1.compare(str2) !=0 ){
	pick=check(str1,str2);
	j=str2.find(pick);
	while(j>=0){
	pick=str2[j];
	i=str1.find(pick);
	str1=move(i,i-1,str1,pick);
	count++;
	std::cout<<str1<<"\t"<<str2<<"\t"<<count<<"\n";
	j--;
	}

	}
	return count;
}

int main(){
	int count;
	std::string str1("ADCB");
	std::string str2("ABCD");
	count=transform(str1,str2);
	std::cout<<"Minimum Steps Required = "<<count;
	return 0;
}
