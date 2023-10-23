export default defineI18nConfig(() => ({
      legacy: false,
      locale: 'en',
      fallbackWarn: false,
      missingWarn: false,
      messages: {
            en: {
                  welcome: 'Welcome',
                  home: 'Home',
                  lists: 'Lists',
                  following: 'Following',
                  watchLater: 'Watch Later',
                  yourCollection: 'Collection',
                  showMore: 'Show More',
                  showLess: 'Show Less',
                  password: 'Password',
                  rePassword: 'Repeat Password',
                  register: 'Register',
                  username: 'Username',
                  country: 'Country',
                  gender: 'Gender',
                  man: 'Man',
                  woman: 'Woman',
                  other: 'Other',
                  birthday: 'Birthday',
                  registerSuccess: 'You have successfully registered',
                  yourFeed: 'Your Feed',
                  search: 'Search',
                  language: 'Language',
                  library: 'Your library',
                  comment: 'Comment',
                  alreadyLoggedIn: 'You are already logged in',
                  login: 'Login',
                  loginError: 'Wrong username or password, please try again',
                  analytics: 'Analytics',
                  upload: 'Upload',
                  follow: 'Follow',
                  yearsOld: 'years old',
                  from: 'from',
                  listenLater: 'Listen Later',
                  manage: 'Manage',
                  managePodcasts: 'Manage Podcasts',
                  uploadPodcast: 'Upload Podcast',
                  edit: 'Edit',
                  delete: 'Delete',
                  error: 'Error',
                  failed: 'Podcast retrieval failed!',
                  ok: 'OK',
                  title: 'Title',
                  description: 'Description',
                  cancel: 'Cancel',
                  success: 'Success',
                  worked: 'Podcast uploaded successfully!',
                  explore: 'Explore',
                  profile: 'Profile',
                  logout: 'Logout',
                  favorites: 'Favorites',
                  unfollow: 'Unfollow',
                  loginFollowed: 'Login to view your followed creators',
                  loginFavorites: 'Login to view your favorites',
                  noFollowed: 'You are not following any creators. Go to a creators profile and click the follow button to follow them.',
                  noFavorites: 'You have no favorites. Go to a podcast and click the favorite button to add it to your favorites.',
                  thumbnailAspectRatioError: 'Thumbnail aspect ratio must be 1:1',
                  feed: 'Feed',
                  scanningForViruses: 'Scanning files... please wait',
                  loginPlay: 'Login to listen to podcasts',
                  selectPodcast: 'Select a podcast to play',
                  history: 'History',
                  noWatchLater: 'You have no podcasts in your watch later list. Go to a podcast and click the watch later button to add it to your watch later list.',
                  noHistory: 'You have no podcasts in your history. Go to a podcast and click the play button to add it to your history.',
                  editProfile: 'Edit Profile',
                  recomended: 'Explore these podcasts',
                  ad: 'Ad',
                  listens: 'Listens',
                  income: 'Income',
                  likes: 'Likes',
                  top3: 'You are most listened to in these 3 countries',
                  demographics: 'Demographics',
                  seeLess: 'See Less',
                  seeMore: 'See More',
                  unavailable: 'The podcast is unavailable',
                  noPodcasts: 'No podcast available',
                  noUploads: 'You haven\'t uploaded any podcasts yet.',
                  noAnalytics: 'The podcast has no analytics yet. Come back later to see the analytics.',
            },
            fr: {
                  welcome: 'Bienvenue',
                  home: 'Accueil',
                  lists: 'Listes',
                  following: 'Abonnements',
                  watchLater: 'À regarder plus tard',
                  yourCollection: 'Collection',
                  showMore: 'Afficher plus',
                  showLess: 'Afficher moins',
                  password: 'Mot de passe',
                  rePassword: 'Répéter le mot de passe',
                  register: "S'inscrire",
                  username: "Nom d'utilisateur",
                  country: 'Pays',
                  gender: 'Genre',
                  man: 'Homme',
                  woman: 'Femme',
                  other: 'Autre',
                  birtday: 'Date de naissance',
                  registerSuccess: "Vous vous êtes inscrit avec succès",
                  yourFeed: 'Votre fil',
                  search: 'Recherche',
                  language: 'Langue',
                  library: 'Votre bibliothèque',
                  comment: 'Commentaire',
                  alreadyLoggedIn: 'Vous êtes déjà connecté',
                  login: "S'identifier",
                  loginError: 'Mauvais nom d\'utilisateur ou mot de passe, veuillez réessayer',
                  analytics: 'Analytique',
                  upload: 'Télécharger',
                  follow: 'Suivre',
                  yearsOld: 'ans',
                  from: 'de',
                  listenLater: 'Écouter plus tard',
                  manage: 'Gérer',
                  managePodcasts: 'Gérer les podcasts',
                  uploadPodcast: 'Télécharger le podcast',
                  edit: 'Modifier',
                  delete: 'Supprimer',
                  error: 'Erreur',
                  failed: 'Échec de la récupération du podcast!',
                  ok: 'OK',
                  title: 'Titre',
                  description: 'Description',
                  cancel: 'Annuler',
                  success: 'Succès',
                  worked: 'Podcast téléchargé avec succès!',
                  explore: 'Explorer',
                  profile: 'Profil',
                  logout: 'Se déconnecter',
                  favorites: 'Favoris',
                  unfollow: 'Se désabonner',
                  loginFollowed: 'Connectez-vous pour voir les créateurs que vous suivez',
                  loginFavorites: 'Connectez-vous pour voir vos favoris',
                  noFollowed: 'Vous ne suivez aucun créateur. Allez sur le profil d\'un créateur et cliquez sur le bouton suivre pour le suivre.',
                  noFavorites: 'Vous n\'avez aucun favori. Allez sur un podcast et cliquez sur le bouton favori pour l\'ajouter à vos favoris.',
                  thumbnailAspectRatioError: 'Le rapport hauteur / largeur de la vignette doit être de 1:1',
                  feed: 'Fil',
                  scanningForViruses: 'Analyse des fichiers... veuillez patienter',
                  loginPlay: 'Connectez-vous pour écouter des podcasts',
                  selectPodcast: 'Sélectionnez un podcast à lire',
                  history: 'Histoire',
                  noWatchLater: 'Vous n\'avez aucun podcast dans votre liste À regarder plus tard. Allez sur un podcast et cliquez sur le bouton À regarder plus tard pour l\'ajouter à votre liste À regarder plus tard.',
                  noHistory: 'Vous n\'avez aucun podcast dans votre historique. Allez sur un podcast et cliquez sur le bouton Lecture pour l\'ajouter à votre historique.',
                  editProfile: 'Modifier le profil',
                  recomended: 'Explorez ces podcasts',
                  ad: 'Publicité',
                  listens: 'Écoutes',
                  income: 'Revenu',
                  likes: 'Aime',
                  top3: 'Vous êtes le plus écouté dans ces 3 pays',
                  demographics: 'Démographie',
                  seeLess: 'Voir moins',
                  seeMore: 'Voir plus',
                  unavailable: 'Le podcast est indisponible',
                  noPodcasts: 'Aucun podcast disponible',
                  noUploads: 'Vous n\'avez pas encore téléchargé de podcasts.',
                  noAnalytics: 'Le podcast n\'a pas encore d\'analyse. Revenez plus tard pour voir les analyses.',
            },

            da: {
                  welcome: 'Velkommen',
                  home: 'Hjem',
                  lists: 'Lister',
                  following: 'Følger',
                  watchLater: 'Se senere',
                  yourCollection: 'Samling',
                  showMore: 'Vis mere',
                  showLess: 'Vis mindre',
                  password: 'Adgangskode',
                  rePassword: 'Gentag adgangskode',
                  register: 'Registrer',
                  username: 'Brugernavn',
                  country: 'Land',
                  gender: 'Køn',
                  man: 'Mand',
                  woman: 'Kvinde',
                  other: 'Andet',
                  birthday: 'Fødselsdag',
                  registerSuccess: 'Du er nu registreret',
                  yourFeed: 'Dit feed',
                  search: 'Søg',
                  language: 'Sprog',
                  library: 'Dit bibliotek',
                  comment: 'Kommentar',
                  alreadyLoggedIn: 'Du er allerede logget ind',
                  login: 'Log ind',
                  loginError: 'Forkert brugernavn eller adgangskode, prøv igen',
                  analytics: 'Analytik',
                  upload: 'Upload',
                  follow: 'Følg',
                  yearsOld: 'år gammel',
                  from: 'fra',
                  listenLater: 'Lyt senere',
                  manage: 'Administrer',
                  managePodcasts: 'Administrer podcasts',
                  uploadPodcast: 'Upload podcast',
                  edit: 'Rediger',
                  delete: 'Slet',
                  error: 'Fejl',
                  failed: 'Mislykkedes at hente podcast!',
                  ok: 'OK',
                  title: 'Titel',
                  description: 'Beskrivelse',
                  cancel: 'Afbestille',
                  success: 'Succes',
                  worked: 'Podcast uploadet med succes!',
                  profile: 'Profil',
                  logout: 'Log ud',
                  explore: 'Udforsk',
                  favorites: 'Favoritter',
                  unfollow: 'Følg ikke',
                  loginFollowed: 'Log ind for at se de skabere, du følger',
                  loginFavorites: 'Log ind for at se dine favoritter',
                  noFollowed: 'Du følger ikke nogen skabere. Gå til en skabers profil og klik på knappen følg for at følge dem.',
                  noFavorites: 'Du har ingen favoritter. Gå til en podcast og klik på knappen favorit for at tilføje den til dine favoritter.',
                  thumbnailAspectRatioError: 'Thumbnail-aspektforholdet skal være 1:1',
                  feed: 'Feed',
                  scanningForViruses: 'Scanner filer ... vent venligst',
                  loginPlay: 'Log ind for at lytte til podcasts',
                  selectPodcast: 'Vælg en podcast at spille',
                  history: 'Historie',
                  noWatchLater: 'Du har ingen podcasts på din se senere liste. Gå til en podcast og klik på knappen se senere for at tilføje den til din se senere liste.',
                  noHistory: 'Du har ingen podcasts i din historie. Gå til en podcast og klik på knappen afspil for at tilføje den til din historie.',
                  editProfile: 'Rediger profil',
                  recomended: 'Udforsk disse podcasts',
                  ad: 'Reklame',
                  listens: 'Lyttere',
                  income: 'Indkomst',
                  likes: 'Synes godt om',
                  top3: 'Du er lyttet mest til i disse 3 lande',
                  demographics: 'Demografi',
                  seeLess: 'Se mindre',
                  seeMore: 'Se mere',
                  unavailable: 'Podcasten er utilgængelig',
                  noPodcasts: 'Ingen podcast tilgængelig',
                  noUploads: 'Du har ikke uploadet nogen podcasts endnu.',
                  noAnalytics: 'Podcasten har endnu ingen analyser. Kom tilbage senere for at se analyserne.',
            },
            jp: {
                  welcome: 'ようこそ',
                  home: 'ホーム',
                  lists: 'リスト',
                  following: 'フォロー',
                  watchLater: '後で見る',
                  yourCollection: 'コレクション',
                  showMore: 'もっと見る',
                  showLess: 'もっと少なく見る',
                  password: 'パスワード',
                  rePassword: 'パスワードを再入力',
                  register: '登録',
                  username: 'ユーザー名',
                  country: '国',
                  gender: '性別',
                  man: '男性',
                  woman: '女性',
                  birthday: '誕生日',
                  registerSuccess: '登録に成功しました',
                  yourFeed: 'あなたのフィード',
                  search: '検索',
                  language: '言語',
                  library: 'あなたのライブラリ',
                  comment: 'コメント',
                  alreadyLoggedIn: 'すでにログインしています',
                  login: 'ログイン',
                  loginError: 'ユーザー名またはパスワードが間違っています。もう一度お試しください',
                  analytics: '分析',
                  upload: 'アップロード',
                  follow: 'フォロー',
                  yearsOld: '歳',
                  from: 'から',
                  listenLater: '後で聞く',
                  manage: '管理',
                  managePodcasts: 'ポッドキャストを管理する',
                  uploadPodcast: 'ポッドキャストをアップロードする',
                  edit: '編集する',
                  delete: '削除する',
                  error: 'エラー',
                  failed: 'ポッドキャストの取得に失敗しました！',
                  ok: 'OK',
                  title: '題名',
                  description: '説明',
                  cancel: 'キャンセル',
                  success: '成功',
                  worked: 'ポッドキャストが正常にアップロードされました！',
                  profile: 'プロフィール',
                  logout: 'ログアウト',
                  explore: '探検する',
                  favorites: 'お気に入り',
                  unfollow: 'フォロー解除',
                  loginFollowed: 'フォローしているクリエイターを表示するにはログインしてください',
                  loginFavorites: 'お気に入りを表示するにはログインしてください',
                  noFollowed: 'クリエイターをフォローしていません。クリエイターのプロフィールに移動して、フォローボタンをクリックしてフォローしてください。',
                  noFavorites: 'お気に入りはありません。ポッドキャストに移動して、お気に入りボタンをクリックしてお気に入りに追加します。',
                  thumbnailAspectRatioError: 'サムネイルのアスペクト比は1：1である必要があります',
                  feed: 'フィード',
                  scanningForViruses: 'ファイルをスキャンしています...しばらくお待ちください',
                  loginPlay: 'ポッドキャストを聴くにはログインしてください',
                  selectPodcast: '再生するポッドキャストを選択します',
                  history: '歴史',
                  noWatchLater: '後で見るリストにポッドキャストがありません。ポッドキャストに移動して、後で見るボタンをクリックして後で見るリストに追加します。',
                  noHistory: '履歴にポッドキャストがありません。ポッドキャストに移動して、再生ボタンをクリックして履歴に追加します。',
                  editProfile: 'プロフィールを編集',
                  recomended: 'これらのポッドキャストを探索する',
                  ad: '広告',
                  listens: 'リスン',
                  income: '所得',
                  likes: '好き',
                  top3: 'これらの3つの国で最も聞かれています',
                  demographics: '人口統計',
                  seeLess: 'もっと少なく見る',
                  seeMore: 'もっと見る',
                  unavailable: 'ポッドキャストは利用できません',
                  noPodcasts: '利用可能なポッドキャストはありません',
                  noUploads: 'まだポッドキャストをアップロードしていません。',
                  noAnalytics: 'ポッドキャストにはまだ分析がありません。後で分析を確認してください。',
            },
            cn: {
                  welcome: '欢迎',
                  home: '主页',
                  lists: '列表',
                  following: '关注',
                  watchLater: '稍后观看',
                  yourCollection: '收藏',
                  showMore: '显示更多',
                  showLess: '显示更少',
                  password: '密码',
                  rePassword: '重复密码',
                  register: '注册',
                  username: '用户名',
                  country: '国家',
                  gender: '性别',
                  man: '男',
                  woman: '女',
                  birthday: '生日',
                  registerSuccess: '您已成功注册',
                  yourFeed: '你的饲料',
                  search: '搜索',
                  language: '语言',
                  library: '你的图书馆',
                  comment: '评论',
                  alreadyLoggedIn: '您已经登录',
                  login: '登录',
                  loginError: '用户名或密码错误，请重试',
                  analytics: '分析',
                  upload: '上传',
                  follow: '关注',
                  yearsOld: '岁',
                  from: '从',
                  listenLater: '稍后收听',
                  manage: '管理',
                  managePodcasts: '管理播客',
                  uploadPodcast: '上传播客',
                  edit: '编辑',
                  delete: '删除',
                  error: '错误',
                  failed: '播客检索失败！',
                  ok: '好',
                  title: '标题',
                  description: '描述',
                  cancel: '取消',
                  success: '成功',
                  worked: '播客上传成功！',
                  explore: '探索',
                  profile: '轮廓',
                  logout: '登出',
                  favorites: '收藏夹',
                  unfollow: '取消关注',
                  loginFollowed: '登录以查看您关注的创建者',
                  loginFavorites: '登录以查看您的收藏夹',
                  noFollowed: '您没有关注任何创建者。转到创建者个人资料并单击关注按钮以关注他们。',
                  noFavorites: '您没有收藏。转到播客并单击收藏按钮将其添加到收藏夹。',
                  thumbnailAspectRatioError: '缩略图纵横比必须为1:1',
                  feed: '饲料',
                  scanningForViruses: '正在扫描文件...请稍候',
                  loginPlay: '登录以收听播客',
                  selectPodcast: '选择要播放的播客',
                  history: '历史',
                  noWatchLater: '您的稍后观看列表中没有播客。转到播客并单击稍后观看按钮将其添加到稍后观看列表。',
                  noHistory: '您的历史中没有播客。转到播客并单击播放按钮将其添加到历史记录中。',
                  editProfile: '编辑个人资料',
                  recomended: '探索这些播客',
                  ad: '广告',
                  listens: '收听',
                  income: '收入',
                  likes: '喜欢',
                  top3: '您在这3个国家中最受欢迎',
                  demographics: '人口统计',
                  seeLess: '看得少',
                  seeMore: '看更多',
                  unavailable: '播客不可用',
                  noPodcasts: '没有可用的播客',
                  noUploads: '您还没有上传任何播客。',
                  noAnalytics: '播客尚无分析。稍后再来看看分析。',
            },
            sa: {
                  welcome: 'أهلا بك',
                  home: 'الصفحة الرئيسية',
                  lists: 'قوائم',
                  following: 'التالية',
                  watchLater: 'شاهد لاحقا',
                  yourCollection: 'مجموعة',
                  showMore: 'أظهر المزيد',
                  showLess: 'أظهر أقل',
                  password: 'كلمه السر',
                  rePassword: 'كرر كلمة المرور',
                  register: 'تسجيل',
                  username: 'اسم المستخدم',
                  country: 'بلد',
                  gender: 'جنس',
                  man: 'رجل',
                  woman: 'امرأة',
                  birthday: 'عيد ميلاد',
                  registerSuccess: 'لقد سجلت بنجاح',
                  yourFeed: 'التغذية الخاصة بك',
                  search: 'بحث',
                  language: 'لغة',
                  library: 'مكتبتك',
                  comment: 'تعليق',
                  alreadyLoggedIn: 'أنت مسجل الدخول بالفعل',
                  login: 'تسجيل الدخول',
                  loginError: 'اسم المستخدم أو كلمة المرور غير صحيحة ، يرجى المحاولة مرة أخرى',
                  analytics: 'تحليلات',
                  upload: 'تحميل',
                  follow: 'تابع',
                  yearsOld: 'سنوات',
                  from: 'من',
                  listenLater: 'استمع لاحقا',
                  manage: 'إدارة',
                  managePodcasts: 'إدارة البودكاست',
                  uploadPodcast: 'تحميل البودكاست',
                  edit: 'تعديل',
                  delete: 'حذف',
                  error: 'خطأ',
                  failed: 'فشل استرداد البودكاست!',
                  ok: 'حسنا',
                  title: 'عنوان',
                  description: 'وصف',
                  cancel: 'إلغاء',
                  success: 'نجاح',
                  worked: 'تم تحميل البودكاست بنجاح!',
                  explore: 'يكتشف',
                  profile: 'الملف الشخصي',
                  logout: 'تسجيل خروج',
                  favorites: 'المفضلة',
                  unfollow: 'إلغاء المتابعة',
                  loginFollowed: 'تسجيل الدخول لعرض المبدعين الذين تتابعهم',
                  loginFavorites: 'تسجيل الدخول لعرض المفضلة',
                  noFollowed: 'أنت لا تتابع أي مبدعين. انتقل إلى ملف تعريف مبدع وانقر فوق زر المتابعة لمتابعته.',
                  noFavorites: 'ليس لديك أي مفضلات. انتقل إلى بودكاست وانقر فوق زر المفضلة لإضافته إلى المفضلة.',
                  thumbnailAspectRatioError: 'يجب أن يكون نسبة العرض إلى الارتفاع للصورة المصغرة 1:1',
                  feed: 'تغذية',
                  scanningForViruses: 'مسح الملفات ... يرجى الانتظار',
                  loginPlay: 'تسجيل الدخول للاستماع إلى البودكاست',
                  selectPodcast: 'حدد بودكاست للعب',
                  history: 'التاريخ',
                  noWatchLater: 'ليس لديك أي بودكاست في قائمة مشاهدة لاحقًا. انتقل إلى بودكاست وانقر فوق زر مشاهدة لاحقًا لإضافته إلى قائمة مشاهدة لاحقًا.',
                  noHistory: 'ليس لديك أي بودكاست في سجلك. انتقل إلى بودكاست وانقر فوق زر التشغيل لإضافته إلى سجلك.',
                  editProfile: 'تعديل الملف الشخصي',
                  recomended: 'استكشف هذه البودكاست',
                  ad: 'إعلان',
                  listens: 'يستمع',
                  income: 'دخل',
                  likes: 'إعجابات',
                  top3: 'أنت الأكثر استماعًا في هذه الدول الثلاث',
                  demographics: 'الديموغرافيا',
                  seeLess: 'أظهر أقل',
                  seeMore: 'أظهر المزيد',
                  unavailable: 'البودكاست غير متوفر',
                  noPodcasts: 'لا يوجد بودكاست متاح',
                  noUploads: 'لم تقم بتحميل أي بودكاست حتى الآن.',
                  noAnalytics: 'لا توجد تحليلات للبودكاست حتى الآن. عد لاحقًا لرؤية التحليلات.',
            },
      }
}))
