<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <div v-if="$nuxt.isOffline" class="offline">
      ネットワークに接続されていません
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'HOME',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'MEMBERS',
          to: '/members'
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Members',
        //   to: '/memberOfTeam'
        // },
        {
          icon: 'mdi-chart-bubble',
          title: 'TOKEN設定',
          to: '/settings'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Ore Teams Analyzer'
    }
  }
}
</script>
<style>
.offline {
  position: fixed; /* 要素の位置を固定する */
  bottom: 0; /* 基準の位置を画面の一番上に指定する */
  left: 0; /* 基準の位置を画面の一番左に指定する */
  margin: 0; /* 要素の余白を０にする */
  padding: 10px; /* 要素内側の余白を指定する */
  height: 50px; /* 高さを指定する */
  width: 100%; /* 幅を指定する */
  background: #326693; /* 背景色を指定する */
  color: white; /* フォントの色を指定する */
  text-align: right;
}
a {
  display: block;
  /* padding: 10px 10px 10px 0px; */
  margin: 20px 0;
  /* font-size: 20px; */
  /* border-bottom: 2px #ddd solid; */
  color: #3b8070;
  text-decoration: none;
  /* transition: border-bottom-color 0.3s linear; */
}
/* a:hover,
a.nuxt-link-exact-active {
  background-color: rgb(245, 245, 245);
} */
a.prefetched:after {
  content: '';
  display: inline-block;
  background: url('../assets/check.svg') no-repeat;
  background-size: 14px;
  width: 14px;
  height: 14px;
  position: relative;
  right: -3px;
  top: 1px;
}
</style>
