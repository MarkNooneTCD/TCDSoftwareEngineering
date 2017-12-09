// Test Api to show working request
exports.test = function(req, res) {
  res.json({message: "API is working!"});
}

// Dummy endpoints that will relay dummy information.
exports.user = function(req, res) {
  res.json({
    name: "API is working!",
    company: "Testing Ltd",
    location: "Dublin, Ireland",
    github_url: "www.github.com/EmmaBarker",
    github_profile: "https://dummyimage.com/600x400/000/fff",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam faucibus velit in mauris tempor, et interdum tortor lacinia. Vivamus egestas magna tincidunt tortor vestibulum, nec ullamcorper lectus tristique. Proin elementum ante tellus, ac congue dui tempor ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean laoreet porta purus a congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla pulvinar viverra diam a ultrices. Aenean ac vehicula nisi. Sed sodales enim felis, ut feugiat ligula fringilla quis. In quis ligula eget sem egestas laoreet eget at ante. Sed pretium lorem orci, eu consequat nulla interdum ac. Cras in urna id felis molestie aliquet ac eget augue.",
    recent_activity: [
      { date:"08-11-1996 15:56", message: "This is a test." },
      { date:"08-11-1996 15:56", message: "This is a test." },
      { date:"08-11-1996 15:56", message: "This is a test." },
      { date:"08-11-1996 15:56", message: "This is a test." },
      { date:"08-11-1996 15:56", message: "This is a test." }
    ],
    followers: [
      { name: "Testing", github_avatar: "https://dummyimage.com/600x400/000/fff" },
      { name: "Testing", github_avatar: "https://dummyimage.com/600x400/000/fff" },
      { name: "Testing", github_avatar: "https://dummyimage.com/600x400/000/fff" },
      { name: "Testing", github_avatar: "https://dummyimage.com/600x400/000/fff" }
    ],
    following: [
      { name: "Testing", github_avatar: "https://dummyimage.com/600x400/000/fff" },
      { name: "Testing", github_avatar: "https://dummyimage.com/600x400/000/fff" }
    ]
  });
}
