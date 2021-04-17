<template>
  <div class="home-page">
    <app-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
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
export default {
  name: 'AppGlobalFeed',
  components: { AppFeed, AppTags, AppBanner },
  data() {
    return {
      apiUrl: '/articles',
      tagsUrl: '/tags'
    };
  }
};
</script>
