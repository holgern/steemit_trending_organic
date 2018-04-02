## Trending Posts that didn't buy votes from bid-bots
* ### What is *Organic Post Viewer*?
Organic post viewer is a tool to see Steemit trending posts that did not pay to bid-bots to buy upvotes.
This is important to estimate what would be the trending posts if the bid-bots didn't exist.
There is a big discussion in Steemit about the usage of bid-bots and its effects on the trending page.

This tool can give everyone the ability to analyze this what-if scenario.

Also, if the user wants to see the posts that have been on the trending list organically, using this tool he/she can easily perform this.

* ### Usage
To use the tool, the user has to simply go to the webpage: https://steemcash.neocities.org/organic.html 

![image.png](https://cdn.utopian.io/posts/e88aec70a7816c438f8c0e9ba9cfacfc9594image.png)
Clicking on the links will take the user to the post.
The author name, the link to the post, the number of upvotes and the actual post pay-out value can be seen from the page.

* ### Technical Details 
[Steem_Trending_Organic](https://steemcash.neocities.org/organic.html) is opensource one page HTML coded with JavaScript using steem.js API. 

The full source code is in the GitHub as : 
https://github.com/firedreamgames/steemit_trending_organic/blob/master/organic.html

The main functions used :

1- SEARCH()

![image.png](https://cdn.utopian.io/posts/cc3e02f2c198c2145603816ad88174a3a5f7image.png)

This function is used to find all the posts in the trending tag.
The query is limited to 100 items, so the result is sent to a second function FORM_ARRAY(RESULT) to get more results.

2- FORM_ARRAY ( RESULT )

![image.png](https://cdn.utopian.io/posts/8e76ca0c85abd211cfc709ec47ce3c3b0397image.png)

This function continue to search the trending posts from where the initial function stopped.

To get the exact point of previous function stop, I added two more parameters to the query, start author and start permlink of 100th post.

This may create a bug of "repeated post" for 100th post which doesn't impact the functionality of the tool so I leave it like this.

The result is sent to the function *evaluate(result)* to check for the known bots.

3- EVALUATE ( RESULT )

![image.png](https://cdn.utopian.io/posts/a0a4f6d0e992e8918f0624b305c9f20fd53eimage.png)

This is where the upvotes is compared with the bot array with .includes.

The bot array is formed with info from @yabapmatt's [SteembotTracker](https://steembottracker.com)

GitHub:https://github.com/MattyIce/bottracker

After comparison, the result array is reformed by eliminating the posts that are upvoted by bid-bots.

After re-forming, result array is sent to write_div(result) function to display data.

4- WRITE_DIV(RESULT)

![image.png](https://cdn.utopian.io/posts/6cf6bacc4bd03cc2b77c0a493b7884d885f1image.png)

This function is writing data to the div's for user display.

* ### RoadMap

This tool is mainly designed for users to see and evaluate the organic posts in trending page.

With this, users can make analysis and post their analysis results and findings about organic posts and how they trend.

* ### Update 03.04.2018
TAGS selection added.
Now, user can select the tags to see *non-boosted* trending posts according to tags.

  
* ### Connect

@FireDream - Steemit

@firedream#3528 - Discord
