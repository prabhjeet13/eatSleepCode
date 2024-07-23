#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n , target;
    cin >> n >> target;
    vector<int> vec(n,0);
     for(int i =0 ;  i < n; i++)
     {  
          cin>>vec[i];
      }
     map<int,int> mp;
    bool found = false;
    for(int i = 0 ; i  <  n; i++)
    {
          if(mp.find(target - vec[i]) != mp.end())
         {
              found = true;
              cout<<mp[target-vec[i]]<<" "<<i;
               break;
          }
          mp[vec[i]];
     }
    if(!found)
   {
        cout<<-1<<" "<<-1;
    }
    return 0;
}
