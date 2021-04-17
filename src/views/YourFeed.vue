<template>
  <div class="home-page">
    <app-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggler />
          <app-feed :apiUrl="apiUrl" />
        </div>
        <div class="col-md-3">
          <app-tags :tagsUrl="tagsUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from '@/components/Feed';
import AppTags from '@/components/Tags';
import AppBanner from '@/components/Banner';
import AppFeedToggler from '@/components/FeedToggler';
export default {
  name: 'AppYourFeed',
  components: { AppFeed, AppTags, AppBanner, AppFeedToggler },
  data() {
    return {
      apiUrl: '/articles/feed',
      tagsUrl: '/tags'
    };
  }
};
</script>
