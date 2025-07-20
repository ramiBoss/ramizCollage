//dijsktra algorithm
#include<iostream>
#include<stdlib.h>
#include<conio.h>
#include<limits.h>

int n;//number of vertices input
using namespace std;
//calculate the minimum distance
int mindistance(int dist[],bool sptSet[])
{
int min=INT_MAX,min_index;

for(int i=0;i<n;i++)
{
if(sptSet[i] == false && dist[i] <= min)
min=dist[i],min_index=i;
}
return min_index;
}

//print the output
void printdistance(int dist[])
{
cout<<"Node		Distance from source"<<endln;
for(int i=0;i < n;i++)
{
cout<<i<<"\t\t"<<dist[i];
}
}

//dijkstra algorithm
void  dijkstra(int graph[][],int src)
{
int dist[n];//distance between connected vertices
bool sptSet[n];//collection of traversed vertices
// initialise distance to infinite and sptSet to false
for(int i=0;i<n;i++)
{
dist[i]=INT_MAX;//initialize with max
sptSet[i]=false;//initialize false
}

dist[src]=0;//distance from source to source
for(int count=0;count<n-1;count++)
{
int u = mindistance(dist,sptSet);//calculate minimum distance

sptSet[u]=true;//set the traversed vertex to true

//update the graph
for(int v=0;v < n;v++)
if(!sptSet[v] && graph[u][v] && dist[u] !=INT_MAX && dist[u]+graph[u][v] < dist[v])
dist[v]=dist[u]+graph[u][v];
}
printdistance(dist);//call to printdistance
}
// main function
int main()
{
clrscr();
cout<<"Enter the number of nodes"<<endln;
cin>>n;
int graph[n][n];//create n*n matrix

//take distance input
/*for(int i=1;i<=n;i++)
{
	for(int j=1;j<=n;j++)
	{
	graph[i][j] = 0;
	}
}*/

for(int i=1;i<=n;i++)
{
	for(int j=1;j<=n;j++)
	{
	if(i == j)
	graph[i][j]=0,continue;
	else
		{
	cout<<"Enter the distance between node" i "and" j<<endln;
	cout<<"Enter zero if not connected"<<endln;
	cin>>graph[i][j];
		}
	}
}
int src;
cout <<"Enter source node"<<endln;
cin>>src;
dijkstra(graph[i][j],src);//call algorithm
return 0;
}
