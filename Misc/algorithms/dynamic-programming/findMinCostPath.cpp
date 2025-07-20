#include <iostream>
#include <stdlib.h>
#include <algorithm>


using namespace std;

int cost[3][3]={ {1,2,2},
				{2,2,1},
				{2,1,2}};

int dp[4][4];
int minCost(int i,int j){
	if(dp[i][j] != 0){
	return dp[i][j];
	}
	if(i == 0 && j == 0)
	return cost[0][0];
	if(i<0 || j<0)
	return INT_MAX;
	if(i>0 || j>0){
		return (min(minCost(i-1,j),minCost(i,j-1))+cost[i][j]);
	}
}

int main(){
	for(int i=0;i<4;i++)
		for(int j=0;j<4;j++)
			dp[i][j]=0;
	int ret_ans=minCost(2,2);
	cout<<ret_ans;
	return 0;
}
