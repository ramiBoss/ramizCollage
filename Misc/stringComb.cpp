#include <iostream>
#include <cstring>
#include <stdlib.h>

using namespace std;

void comb(char *in,char *out,int length,int recurLev,int start){
	for(int i=start;i<length;i++){
		out[recurLev]=in[i];
		out[recurLev+1]='\0';
		cout<<out<<endl;
		if(i<length-1)
		comb(in,out,length,recurLev+1,i+1);
	}
}


int main(){
	char in[]="wxyz";
	int length=strlen(in);
	char *out;
	out=(char *)malloc(length+1);
	comb(in,out,length,0,0);
	return 0;
}
