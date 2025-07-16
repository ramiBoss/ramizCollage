#include <iostream>
#include <stdlib.h>
#include <queue>
#define V 6


int dfs(int v,int visited[V],int graph[][V]){
	int i;
	visited[v]=1;
	std::cout<<v<<"\t";
	for(i=0;i<V;i++){
		if(visited[i]==0 && graph[v][i]==1)
		{
			dfs(i,visited,graph);
		}
	}
}


int dft(int graph[][V]){
	int i;
	int visited[V];
	for(i=0;i<V;i++)
	visited[i]=0;
	
	dfs(0,visited,graph);
}

int main(){
	int graph[][V] = {{0,1,1,1,0,1},
        {1,0,1,0,0,0},
        {1,1,0,1,0,0},
        {1,0,1,0,1,1},
		{0,0,0,1,0,1},
		{1,0,0,1,1,0}};
        dft(graph);
        return 0;
}
