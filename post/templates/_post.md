---
layout: post
title:  "<%= postTitle %>"
date:   <%= postDate %> <%= postTime %><% if (postCategories) { %>
categories:<% _.each(postCategories, function(d) { %>
  - <%= d %><% });} %>
---
