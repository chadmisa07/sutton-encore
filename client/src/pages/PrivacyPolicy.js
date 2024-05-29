import React, { useEffect } from "react";
import Title from "../components/privacyPolicy/Title";
import Text from "../components/privacyPolicy/Text";
import List from "../components/privacyPolicy/List";

const PrivacyPolicy = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl my-2">Politique de vie Privé</h1>

      <div className="mt-6">
        <Title title="COLLECTE DES RENSEIGNEMENTS PERSONNELS" />
        <Text text="La présente Politique de protection de la vie privée s’applique aux site Web ainsi qu’à toute éventuelle application mobile de Sutton Encore.  Votre utilisation, du site web ou d’une application éventuelle, signifie une acceptation de la présente Politique de confidentialité et vous donnez votre consentement aux pratiques décrites dans cette présente Politique. La présente Politique de protection de la vie privée explique la manière de Sutton Encore de recueillir, utiliser, divulguer et transférer les renseignements personnels fournis via l’entremise de son site Web et éventuelle application. Elle décrit également vos droits et vos choix concernant l’utilisation et la diffusion de vos renseignements, notamment la façon dont vous pouvez accéder à ces renseignements et les mettre à jour." />
        <Text text="En utilisant notre site Web ou notre application, vous signifiez que vous acceptez nos conditions d’utilisation ainsi que la présente Politique de protection de la vie privée. Vous consentez, alors, aux pratiques qu’elle décrit." />
        <Text text="En cas de questions à propos de notre Politique de protection de la vie privée ou si vous voulez exercer vos droits et vos choix, contactez-nous comme l’indique la section intitulée   « Pour nous contacter » qui se trouve plus bas." />
      </div>

      <div className="mt-6">
        <Title title="RENSEIGNEMENTS QUE VOUS FOURNISSEZ" />
        <Text text="Sutton Encore recueille vos renseignements personnels que vous fournissez par l’intermédiaire de son site Web et de son application. Les renseignements personnels que nous recueillons comprennent des renseignements qui vous identifient, se rapportent à vous, vous décrivent ou peuvent raisonnablement être associés à vous, directement ou indirectement. Les catégories de renseignements personnels que nous recueillons sont les suivantes :" />
        <List
          list={[
            `Coordonnées: Nous recueillons votre prénom, votre nom, votre adresse postale, votre adresse courriel et votre numéro de téléphone.`,
            `Enregistrement d’un compte: Nous recueillons les mots de passe et d’autres renseignements pour l’authentification du compte et l’accès au compte.`,
            `Données de profil: Nous recueillons des renseignements sur vos intérêts, vos favoris et vos préférences. `,
            `Contenu des messages: Nous recueillons le contenu des messages que vous nous faites parvenir, comme les commentaires ou les critiques sur les produits, des questions que vous posez ou les renseignements que vous nous fournissez.`,
            `Données sur les candidatures reçues:  Nous recueillons les données nécessaires à l’examen de votre candidature à un poste vacant, si vous nous soumettez une candidature, notamment toutes les informations présents dans votre curriculum vitae, votre prénom et nom, votre numéro de téléphone, la ville et le poste qui vous intéresse ainsi que toutes informations en lien avec votre demande d’emploi.`,
          ]}
        />
        <Text text="Nous recueillons les renseignements que vous fournissez à divers endroits de notre site Web et application, notamment les suivantes :" />
        <List
          list={[
            `Enregistrement d’un compte: Pour enregistrer un compte auprès de Sutton Encore, afin de faire une commande, vous devrez remplir un formulaire sur nos sites Web ou nos applications afin de fournir les coordonnées et les données d’identification associées à votre compte. Vous pouvez également fournir des données de paiement, afin de faire le paiement en ligne, et des données de profil pour accélérer et faciliter vos futures commandes avec Sutton Encore.`,
            `Courriels et autres communications volontaires: Vous pouvez également décider de communiquer avec nous par courriel, par l’intermédiaire de nos sites Web, de nos applications, nos réseaux sociaux, ou par d’autres moyens. Ces communications peuvent être liées à nos activités de service à la clientèle, à des questions que vous pourriez avoir, des commentaires ou à d’autres fins. Nous recueillons les renseignements contenus dans ces communications, et ceux-ci peuvent inclure des renseignements qui vous identifient personnellement.`,
            `Programmes de récompenses:  Il est possible que nous proposions des programmes de récompenses, des tirages au sort, des concours, des sondages ou d’autres promotions (« promotion ») par l’intermédiaire de nos sites Web, nos applications ou nos réseaux sociaux. Pour pouvoir participer à une promotion, vous devez fournir des coordonnées, des données de profil ou d’autres renseignements qui seront demandés aux gagnants.`,
            `Divulgation volontaire: Lorsque vous utilisez nos sites Web ou nos applications, vous pouvez décider de divulguer volontairement d’autres renseignements que nous ne demandons pas; le cas échéant, vous êtes seul responsable de ces renseignements. Par conséquent, vous devez prendre les mesures nécessaires pour empêcher la communication de renseignements non requis lorsque vous utilisez nos Sites Web ou nos applications.`,
          ]}
        />
      </div>
      <div className="mt-6">
        <Title title="RENSEIGNEMENTS RECUEILLIS AUTOMATIQUEMENT" />
        <Text text="Lorsque vous visitez nos sites Web ou nos applications, nous pouvons recueillir automatiquement des renseignements sur votre appareil et sur la façon dont celui-ci interagit avec nos sites Web ou nos applications." />
        <Text text="Les catégories de renseignements que nous pouvons recueillir comprennent les suivantes :" />
        <List
          list={[
            `Données sur l’utilisation des services: Nous recueillons différentes données concernant les fonctions que vous utilisez, les courriels et les publicités que vous consultez, les produits que vous examinez ou achetez, la date et l’heure auxquelles vous accédez aux sites Web ou aux applications, les pages auxquelles vous accédez lorsque vous utilisez nos sites Web, nos applications ou nos réseaux sociaux. Nous recueillons également l’adresse des sites Web, à partir desquels vous accédez aux sites Web ou aux applications ainsi que tous autres renseignements similaires`,
            `Données relatives à la connectivité et à la configuration des appareils: Nous recueillons des données sur le type d’appareil, le système d’exploitation et le navigateur que vous utilisez, votre fournisseur d’accès à Internet, les paramètres régionaux et linguistiques de votre appareil, ainsi que d’autres renseignements similaires. Ces données comprennent également l’adresse IP, l’adresse MAC, l’identifiant publicitaire de l’appareil (p. ex. IDFA ou AAID) et d’autres identifiants de l’appareil.`,
            `Données de localisation: Si votre appareil le permet, il est possible que nous recueillons des données qui concernent la localisation de votre appareil, qui peuvent être précisés, par exemples des données de latitude et de longitude ou imprécises tel qu’une localisation dérivée d’une adresse IP, ou des données qui indiquent une ville ou un code postal`,
          ]}
        />
        <Text text="Nous utilisons des témoins et d’autres technologies de suivi pour recueillir automatiquement ces renseignements, notamment les suivantes :" />
        <List
          list={[
            `Fichiers journaux: Un fichier journal est un fichier qui enregistre tous les événements qui se produisent lors de votre utilisation des sites Web et des applications Sutton Encore, tels que l’adresse IP, le type de navigateur, le fournisseur de services Internet, les pages de renvoi ou de sortie, le système d’exploitation, l’horodatage ainsi que toutes autres données connexes qui sont utile à l’utilisation  nos sites Web, nos applications ou nos réseaux sociaux.`,
            `Témoins: Les serveurs de Sutton Encore peuvent placer un témoin sur votre appareil dans le but de stocker des données dans le navigateur de votre appareil ou simplement d’accéder à des caractéristiques de suivi amovibles préexistantes sur votre appareil pour vous permettre d’utiliser les sites Web et les applications dans le but de personnaliser votre expérience sur les Sites Sutton Encore. La définition d’un témoin est: un petit élément de donnée qui est envoyé par un serveur Web à votre appareil et qui ensuite est stocké par votre navigateur sur le disque dur de votre appareil. Les témoins et le stockage du navigateur permettent de reconnaître votre appareil lorsque vous êtes sur nos sites Web et nos applications, afin de personnaliser votre expérience en ligne et de prendre en charge les fonctions de sécurité. Les témoins et le stockage du navigateur sont également utiles pour rendre la connexion des utilisateurs plus efficace, pour suivre l’historique des transactions et pour préserver les renseignements entre les sessions. Les renseignements recueillis à partir des témoins et du stockage du navigateur peuvent être utilisés à des fins d' amélioration de la fonctionnalité des sites Web et des applications, analyser votre utilisation des sites Web et des applications, ou encore vous proposer des publicités qui sont ciblées en lien avec vos préférences.`,
          ]}
        />
        <Text text="Les types de témoins et de balises présents sur nos sites Web et applications comprennent les suivants." />
        <List
          list={[
            `Témoins de fonctionnalité : Utilisés pour mémoriser vos préférences dans le but de faciliter les transactions telles que les achats sur nos sites Web et des applications.`,
            `Témoins de performance ou d’analyse: Utilisés pour mesurer l’activité de nos sites Web et des applications afin d’améliorer l’expérience de chaque utilisateur.`,
            `Témoins de ciblage: Utilisés pour afficher les informations et les offres qui vous intéressent spécifiquement en fonction des préférences enregistrées sur nos sites Web et nos applications.`,
            `Stockage local: Nous utilisons le stockage local, tel que le stockage HTML5, pour stocker des renseignements liés au fait que l’utilisateur a choisi de « rester connecté », ainsi que des jetons si d’autres services sont utilisés. Nous pourrions nous associer à d’autres entités pour fournir certaines fonctionnalités sur nos sites Web et applications, ou pour afficher des publicités en fonction de votre activité de navigation sur le Web en utilisant le stockage local – tel que le stockage HTML5 – pour recueillir et stocker des renseignements. Divers navigateurs peuvent proposer leurs propres outils de gestion pour supprimer le stockage local HTML5.`,
            `Technologies de localisation: Les logiciels des systèmes de positionnement global (GPS), le géofiltrage et d’autres technologies de localisation permettent de vous localiser afin  de faire la vérification de votre position et la diffusion ou la restriction de contenu pertinent en fonction de votre position.`,
            `Méthodes de suivi intégrées aux applications: Plusieurs technologies de suivi peuvent être incluses dans notre application mobile et elles ne peuvent pas être contrôlées par les paramètres du navigateur. Certaines utilisent un identifiant publicitaire ou d’autres identifiants d’appareil pour associer l’activité de l’utilisateur d’une application à une application particulière, et pour suivre l’activité de l’utilisateur dans plusieurs applications.`,
          ]}
        />
        <Text text="Nous pouvons intégrer diverses technologies de suivi dans nos courriels, nos sites Web ou nos applications, ainsi que dans nos publicités. Certaines de ces technologies de suivi permettent de suivre vos activités à travers le temps et les services dans le but d’associer les différents appareils que vous utilisez et de vous proposer du contenu et des publicités pertinents." />
      </div>
      <div className="mt-6">
        <Title title="UTILISATION DES RENSEIGNEMENTS" />
        <Text text="Sutton Encore recueille et utilise les renseignements personnels à des fins opérationnelles et commerciales uniquement, tel qu'il est mentionné dans la présente Politique de protection de la vie privée. La collecte et l’utilisation de renseignements comprennent les suivantes :" />
        <List
          list={[
            `Exploiter et gérer nos sites Web et nos applications, afin de vous fournir des produits, des services ainsi que des promotions et créer, gérer et entretenir vos comptes;`,
            `Exécuter vos demandes, par exemple; la réponse à vos commentaires ou à vos demandes, le traitement, la gestion ou l’exécution des transactions, ainsi que l’envoi de communications connexes par le biais des réseaux sociaux;`,
            `Maintenir la sécurité et l’intégrité de nos systèmes, dans le but de prévenir et traiter la fraude, l’accès illégal ainsi que la violation de nos politiques et conditions d’utilisations;`,
            `Vous envoyez des mises à jour, des alertes de sécurité, des informations sur les modifications de nos différentes politiques et des messages administratifs par le biais de nos Site Web, nos applications ou nos réseaux sociaux;`,
            `Aider à valider et à créer l’identité de chacun de nos utilisateurs;`,
            `Améliorer nos sites Web, nos applications, nos réseaux sociaux, notre succursale, nos publicités, nos produits, nos promotions, nos services et tout ce qui est en lien direct avec Sutton Encore;`,
            `Vous envoyer des bulletins d’information promotionnels, des offres, des publicités et des communications de marketing ainsi que toutes autres renseignements concernant l’entreprise Sutton Encore.`,
          ]}
        />
        <Text text="Nonobstant l’information qui précède, nous pouvons utiliser quelques renseignements ne permettant pas de vous identifier et cela sans obligation envers vous, sauf si la loi l’interdit. Pour avoir plus amples d’informations en ce qui concerne vos droits et vos choix en lien avec la manière dont vos renseignements sont utilisés, vous pouvez consulter la section intitulée « Vos droits et vos choix » qui se trouve plus bas." />
      </div>

      <div className="mt-6">
        <Title title="DIVULGATION DE RENSEIGNEMENTS" />
        <Text text="Nous divulguons les renseignements personnels que nous recueillons conformément aux pratiques décrites dans cette politique. Nous pouvons recueillir divers renseignements auprès de ces différentes catégories d’entités:" />
        <List
          list={[
            `Fournisseurs de services:  Sutton Encore partage des renseignements personnels avec des entités qui nous permettent de maintenir et d’exploiter nos sites Web, nos applications et nos réseaux sociaux, à traiter les paiements en lien avec les commandes, à analyser différentes données, à faire du marketing ainsi que de la publicité et faire plusieurs autres activités commerciales. Ces entités ont l’autorisation d’utiliser ces renseignements uniquement pour l’exécution des fonctions énumérées plus haut. Cependant, nous pouvons les autoriser à utiliser quelques renseignements, ne permettant pas de vous identifier et d'autres données importantes, sauf si la loi l’interdit.`,
            `Sociétés affiliées: Dans quelques situations, nous partageons des renseignements personnels avec nos entités liées, notamment nos sociétés mères et sœurs.`,
            `Partenaires commerciaux: Nous partageons des renseignements personnels avec nos différents partenaires commerciaux dans le seul but de pouvoir vous offrir différents services et de vendre nos produits.`,
            `Promotions: Nos promotions peuvent être proposées ou commanditées par d’autres entités. En participant à une de nos promotions, vous acceptez le règlement officiel qui régit notre promotion et vous pouvez, sauf s’il est interdit par la loi, autoriser le commanditaire ou d’autres entités à utiliser votre nom, votre voix et votre image dans des documents publicitaires ou marketing.`,
            `Fusion ou acquisition: Dans l’éventualité, d’un processus de fusion, d’acquisition ou de vente de la totalité ou d’une partie de ses actifs, vous serez informé par courriel ou via un avis sur nos sites Web ou nos applications de tout changement de propriété et d’utilisation de vos renseignements.`,
            `Sécurité et divulgation forcée: Sutton Encore peut être tenue de divulguer vos renseignements personnels suite à des demandes légitimes des autorités gouvernementales, notamment en lien avec les exigences en matière de sécurité nationale ou d’application de la loi. Nous pouvons divulguer vos renseignements personnels dans le but de se conformer à toutes exigences juridiques, qui peut s'avérer nécessaire pour protéger nos droits, votre sécurité ou celle d’autres personnes, ou pour enquêter sur une fraude. Nous pouvons également divulguer des renseignements personnels vous concernant dans le but de défendre les conditions d’utilisation ou d’autres politiques applicables à nos sites Web ou à nos applications, ou si nous pensons que vos actions sont incompatibles avec nos ententes ou politiques d’utilisation.`,
            `Facilitation des demandes: Nous divulguons des renseignements personnels selon vos instructions.`,
            `Consentement: Nous pouvons communiquer vos renseignements avec votre consentement comme le prévoit la loi.`,
          ]}
        />
        <Text text="Nonobstant l’information qui précède, nous pouvons utiliser quelques renseignements ne permettant pas de vous identifier et cela sans obligation envers vous, sauf si la loi l’interdit. Pour avoir plus amples d’informations en ce qui concerne vos droits et vos choix en lien avec la manière dont vos renseignements sont utilisés, vous pouvez consulter la section intitulée « Vos droits et vos choix » qui se trouve plus bas." />
      </div>
      <div className="mt-6">
        <Title title="LIENS, APPLICATIONS ET DISPOSITIFS EXTERNES" />
        <Text text="Nos sites Web, nos applications, nos réseaux sociaux peuvent contenir des liens vers d’autres sites Web, il est également possible que des liens soient accessibles via des dispositifs qui ne sont pas reliés à Sutton Encore. Ces liens et dispositifs ne sont pas commandités ni affiliés. Sutton Encore n’a pas examiné tous les sites liés par hyperlien à ses sites Web ou applications, ni tous les dispositifs par lesquels certaines de ses applications sont accessibles. Sutton Encore n’est donc, pas responsable du contenu ou des pratiques de protection de la vie privée d’autres sites Web, applications ou dispositifs. L’utilisateur accède aux liens et aux dispositifs et les utilise à ses propres risques. Sutton Encore ne donne aucune garantie quant au contenu, à l’exhaustivité ou à l’exactitude de ces liens ou dispositifs, des sites liés par hyperlien à ses sites Web ou applications, ou des dispositifs. Les sites Web d’autres entités qui sont accessibles par des hyperliens à partir des sites Web ou des applications de Sutton Encore peuvent utiliser des témoins et d’autres technologies de suivi. Avant de fournir des renseignements à d’autres sites Web et fabricants d’appareils, Sutton Encore vous encourage fortement à lire leurs politiques de protection de la vie privée. De plus, Sutton Encore n’endosse pas implicitement les sites Web liés par hyperlien à ses sites Web ou applications, ou aux dispositifs par lesquels les applications peuvent être accessibles." />
      </div>

      <div className="mt-6">
        <Title title="FONCTIONNALITÉ DE RÉSEAUX SOCIAUX" />
        <Text text="Nos sites Web et nos applications peuvent comprendre des fonctionnalités de réseaux sociaux. Celles-ci peuvent utiliser différentes technologies de suivi pour recueillir des renseignements, tels que votre adresse IP ou les pages que vous visitez sur nos sites Web ou nos applications. Il est aussi possible que les différentes technologies installent un témoin pour permettre à la fonctionnalité de réseaux sociaux de fonctionner convenablement. Si vous utilisez les fonctionnalités de médias sociaux, les renseignements que vous publiez ou auxquels vous donnez accès peuvent s’afficher publiquement sur nos sites Web ou nos applications, ou par le réseau social que vous utilisez, qui constitue une entité distincte. De même, si vous publiez des renseignements sur un réseau social qui fait référence à nos sites Web ou applications, votre message peut être utilisé sur notre site Web ou nos applications ou en lien avec ceux-ci. De plus, Sutton Encore et le réseau social en question peuvent tous deux avoir accès à certains renseignements sur vous et votre utilisation de notre site Web et de nos applications, ainsi que des fonctionnalités de médias sociaux. Les fonctionnalités des médias sociaux sont exploitées par un réseau social et constituent une entité distincte. Elle est également régi par la politique de protection de la vie privée du réseau en question. De plus, Sutton Encore n’est pas responsable des politiques ou des pratiques commerciales des entités distinctes et ne fait aucune représentation à cet égard, et nous vous encourageons à consulter leurs politiques de protection de la vie privée et leurs conditions d’utilisation." />
      </div>

      <div className="mt-6">
        <Title title="ANALYSE, PUBLICITÉ ET RECIBLAGE" />
        <Text text="Sutton Encore fait appel à d’autres entités pour des services d’analyse. Ces entités peuvent utiliser des témoins et d’autres technologies de suivi pour analyser votre utilisation de nos sites Web et applications, notamment les données recueillies lorsque vous parlez et utilisez les services de commande vocale." />
        <Text text="Par ailleurs, nous faisons appel à d’autres entités pour diffuser des publicités sur nos sites Web et applications ou sur d’autres services. Ces entités peuvent utiliser des témoins ou d’autres technologies de suivi pour recueillir et partager avec nous des renseignements sur vos visites à ce service et à d’autres services afin de présenter des publicités sur des biens et services susceptibles de vous intéresser davantage, de mesurer et de rechercher l’efficacité de nos publicités, de suivre l’utilisation des pages et les chemins suivis pendant les visites sur nos sites Web et applications, de nous aider à diffuser des bannières publicitaires pertinentes sur nos sites Web et applications et sur d’autres services, ainsi que de suivre l’utilisation de nos bannières publicitaires et d’autres liens à partir des services de nos partenaires commerciaux vers nos sites Web et applications. Sutton Encore peut utiliser les renseignements recueillis sur ses sites Web et applications à des fins de publicité comportementale en ligne, par exemple le reciblage, et pour personnaliser les annonces qui vous sont destinées lorsque vous visitez d’autres services." />
        <Text text="Sutton Encore fait également appel à des fournisseurs de services qui utilisent des témoins pour nous permettre, ainsi qu’à eux, de savoir quelles publicités vous voyez et sur lesquelles vous cliquez lorsque vous visitez nos sites Web, nos applications ou nos sites affiliés. Ces témoins permettent d’effectuer le suivi d’attribution, qui estime quelle publicité ou quelle source de marketing a amené quelqu’un sur nos sites Web ou applications, ou qui détermine quelle source de marketing a mené à des actions comme une visite ou un achat. Ces technologies permettent à nos fournisseurs de services de reconnaître votre appareil mobile ou votre dispositif réseau chaque fois que vous visitez ses sites Web ou ses applications, ou d’autres sites Web et applications mobiles, en fonction de données comme un témoin, votre adresse IP ou l’identifiant de l’appareil, mais ne permettent pas l’accès à d’autres renseignements personnels de Sutton Encore. Les renseignements obtenus par ces fournisseurs de services sont pseudonymisés et jamais repersonnalisés." />
        <Text text="Nous utilisons également des services de mise en correspondance des audiences pour rejoindre des personnes (ou des personnes similaires à des personnes) qui ont visité nos sites Web ou nos applications, ou qui sont identifiées dans une ou plusieurs de nos bases de données (« publicités ciblées »). Pour ce faire, nous téléchargeons une liste de clients vers un service technologique ou nous intégrons par programmation des technologies telles que des pixels, des ensembles de développement logiciel (SDK) ou des interfaces de programmation d’application (API) d’un service technologique à nos propres sites Web ou applications, le service technologique faisant correspondre des facteurs communs entre nos données et les leurs. Par exemple, nous intégrons le pixel Facebook sur nos sites Web et pouvons partager votre adresse électronique avec Facebook dans le cadre de notre utilisation de la fonction d'audience personnalisées de Facebook. Certains services technologiques, tels que LiveRamp, peuvent nous fournir leurs propres données, qui sont ensuite téléchargées dans un autre service technologique pour faire correspondre les facteurs communs entre ces ensembles de données." />
        <Text text="Comme mentionné précédemment, ces services peuvent agir en tant que nos prestataires de services ou, dans certains contextes, décider indépendamment de la manière de traiter vos renseignements. Les renseignements recueillis par ces services peuvent être transmis et stockés sur des serveurs." />
      </div>

      <div className="mt-6">
        <Title title="VOS DROITS ET VOS CHOIX" />
        <Text text="Il est important que tous les renseignements personnels que nous détenons à votre sujet soient exacts et à jour; veuillez nous tenir informés de tout changement à vos renseignements personnels. En vertu de la loi, vous avez le droit de faire la demande afin d’avoir l’accès aux renseignements personnels que nous détenons à votre sujet et de les corriger." />
        <Text text="Vous pouvez consulter vos renseignements personnels et en corriger certains en vous connectant à nos sites Web ou nos applications, en consultant votre profil sur votre compte personnel." />
        <Text text="Si vous souhaitez consulter ou corriger vos renseignements personnels, ou retirer votre consentement à leur utilisation. Il se peut que nous ne cédions pas à une demande de modification des renseignements si nous croyons que la modification enfreindrait une loi ou une exigence juridique ou rendrait les renseignements inexacts. Nous nous réservons le droit de vous facturer des frais pour accéder à vos renseignements personnels, mais nous vous en informerons à l’avance." />
        <Text text="Nous pouvons vous demander des renseignements spécifiques afin de nous aider à confirmer votre identité et votre droit d’accès, et de vous fournir les renseignements personnels que nous détenons à votre sujet ou d’effectuer les changements que vous demandez. Cependant, en vertu des lois applicables, nous pouvons être autorisés ou obligés de refuser de vous donner accès à une partie ou la totalité des renseignements personnels que nous détenons à votre sujet, également nous pouvons avoir détruit, effacé ou anonymisé vos renseignements personnels, conformément à nos obligations et pratiques en matière de conservation des dossiers. Si nous ne pouvons pas vous donner accès à vos renseignements personnels, nous vous en indiquerons les raisons, sous réserve des restrictions juridiques ou réglementaires." />
        <Text text="Nous vous donnerons accès à vos renseignements personnels, sous réserve des exceptions énoncées dans les lois applicables en matière de protection de la vie privée." />
      </div>

      <div className="mt-6">
        <Title title="RETRAIT DE VOTRE CONSENTEMENT" />
        <Text text="Lorsque vous avez donné votre consentement à la collecte, l’utilisation, la divulgation et le transfert de vos renseignements personnels, vous pouvez avoir un droit légal de retirer votre consentement dans certaines circonstances. Si vous souhaitez retirer votre consentement, contactez-nous aux coordonnées fournies ci-dessous. Veuillez noter que si vous retirez votre consentement, il se peut que nous ne soyons pas en mesure de vous fournir un produit ou un service particulier." />
      </div>

      <div className="mt-6">
        <Title title="GÉNÉRALITÉS CONCERNANT LES TECHNOLOGIES DE SUIVI" />
        <Text text="La plupart des navigateurs Web (tels que Microsoft Internet Explorer, Google Chrome, Firefox et Apple Safari) acceptent les témoins par défaut. Vous pouvez demander à votre navigateur de refuser ou de supprimer les témoins en modifiant ses paramètres. Si vous utilisez plusieurs navigateurs sur votre appareil, vous devrez donner des instructions à chaque navigateur séparément. Votre capacité à limiter les témoins est soumise aux paramètres et aux limitations de votre navigateur." />
        <Text text="À tout moment, vous pouvez réinitialiser l’identifiant publicitaire de votre appareil ainsi que les données de localisation recueillies par l'entremise d’une application  via les paramètres de ce dernier. L’identifiant publicitaire est conçu afin de vous permettre de limiter l’utilisation des renseignements recueillis à votre sujet. Pour arrêter toute collecte de renseignements via une application, il est possible de désinstaller cette dernière." />
        <Text text="Il se peut que les paramètres de votre navigateur vous permettent de transmettre automatiquement aux services en ligne que vous visitez un signal demandant de ne pas vous suivre. Par conséquent, à moins que la loi nous oblige à le faire, Sutton Encore ne répond pas à ces signaux ou autres mécanismes." />
        <Text text="Toutefois, si vous désactivez les témoins et d’autres fonctions de suivi des appareils, il est possible que vous ne puissiez pas utiliser certaines fonctions de nos sites Web ou applications." />
      </div>

      <div className="mt-6">
        <Title title="COMMUNICATIONS" />
        <Text text="Afin de vous fournir un service hors pair, nous pouvons vous envoyer des communications liées à vos transactions, à la sécurité ou l’administration de nos sites Web ou de nos applications. Sutton Encore peut également vous envoyer d’autres messages ou mises à jour à propos de nos sites Web, de nos applications ou de nos promotions. Si vous ne souhaitez pas recevoir de communications promotionnelles de Sutton Encore, vous pouvez vous désabonner en tout temps en suivant les instructions fournies dans ces communications. " />
        <Text text="Veuillez noter que même si vous choisissez de ne pas recevoir de communications promotionnelles, nous pouvons continuer à vous envoyer différents courriels non promotionnels, concernant votre compte, des services ou nos relations d’affaires courantes." />
      </div>

      <div className="mt-6">
        <Title title="TRANSFERT INTERNATIONAL" />
        <Text text="Sutton Encore peut transférer les renseignements personnels que nous recueillons ou que vous fournissez, comme énoncé dans la présente politique, à des sous-traitants, des fournisseurs de services ou d’autres tiers auxquels nous faisons appel pour soutenir notre entreprise (comme les fournisseurs de services d’analyse et de moteurs de recherche qui nous aident à améliorer et à optimiser nos sites Web) et qui ont l’obligation contractuelle de garder les renseignements personnels confidentiels, de les utiliser uniquement aux fins pour lesquelles nous les leur communiquons et de traiter les renseignements personnels selon les mêmes normes que celles énoncées dans la présente politique." />
        <Text text="Il se peut que nous traitions, stockions et transférons vos renseignements personnels dans ou vers un pays étranger, où les lois sur la protection de la vie privée sont différentes et peuvent ou non être aussi exhaustives que les lois canadiennes. Dans ces circonstances, les gouvernements, les tribunaux, les organismes d’application de la loi et les organismes de réglementation du pays en question peuvent être en mesure d’accéder à vos renseignements personnels en vertu des lois de ce pays. Lorsque nous faisons appel à un fournisseur de services, nous exigeons que ses normes de sécurité et de protection des renseignements personnels soient conformes à la présente politique et aux lois canadiennes applicables en matière de protection de la vie privée." />
      </div>

      <div className="mt-6">
        <Title title="PROTECTION DE LA VIE PRIVÉE DES ENFANTS" />
        <Text text="Nos sites Web et applications ne sont pas destinés aux enfants de moins de 13 ans. Aucune personne âgée de moins de 13 ans ne peut fournir de renseignements personnels sur nos sites Web ou applications. Si vous avez moins de 13 ans, vous devez éviter d’utiliser ou de fournir des renseignements personnels sur nos sites Web ou nos applications ou au moyen de l’une de leurs fonctionnalités, d’effectuer des achats sur nos sites Web ou de nos applications, et de nous fournir des renseignements vous concernant." />
        <Text text="Si nous apprenons que nous avons recueilli ou reçu des renseignements personnels d’un enfant de moins de 13 ans sans vérification du consentement parental, nous supprimerons ces renseignements. Si vous croyez que nous pourrions détenir des renseignements provenant d’un enfant de moins de 13 ans ou le concernant, veuillez nous contacter rapidement." />
      </div>

      <div className="mt-6">
        <Title title="SÉCURITÉ DES DONNÉES" />
        <Text text="La sécurité de vos renseignements personnels est très importante pour nous. Sutton Encore utilise des mesures physiques, électroniques et administratives conçues pour protéger vos renseignements personnels contre la perte accidentelle et l’accès, l’utilisation, la modification et la divulgation non autorisés. Sutton Encore a restreint l’accès autorisé à vos renseignements personnels aux personnes qui ont un motif légitime de connaître ces renseignements pour vous fournir des produits ou services, et aux personnes que vous avez autorisées à avoir accès à ces renseignements. Nous stockons tous les renseignements que vous nous fournissez derrière des pare-feu sur nos serveurs sécurisés. Toutes les transactions de paiement sont chiffrées à l’aide de la technologie SSL et 3DS." />
        <Text text="La sécurité de vos renseignements dépend également de vous. Lorsque nous vous donnons (ou lorsque vous choisissez) un mot de passe pour accéder à certaines sections de nos sites Web ou de nos applications, vous êtes responsable de la confidentialité de ce mot de passe. Nous vous demandons de ne pas divulguer votre mot de passe à qui que ce soit." />
        <Text text="Malheureusement, la transmission de renseignements via Internet n’est pas totalement sécurisée. Nous faisons tout notre possible pour protéger vos renseignements personnels, nous ne pouvons pas garantir la sécurité des renseignements personnels transmis à nos sites Web ou applications. Toute transmission de renseignements personnels se fait à vos propres risques." />
      </div>

      <div className="mt-6">
        <Title title="CONSERVATION DES DONNÉES" />
        <Text text="Sauf autorisation ou exigence contraire de la législation ou de la réglementation applicable, nous ne conserverons vos renseignements personnels que le temps nécessaire à l’atteinte des objectifs pour lesquels nous les avons recueillies, y compris pour satisfaire à toute exigence juridique, comptable ou de production de rapport. Dans certaines circonstances, nous pouvons anonymiser ou dépersonnaliser vos renseignements personnels afin qu’ils ne puissent plus être associés à vous. Nous nous réservons le droit d’utiliser ces données anonymisées et dépersonnalisées à des fins commerciales légitimes sans vous en informer ou sans votre consentement." />
      </div>

      <div className="mt-6">
        <Title title="MODIFICATIONS À LA PRÉSENTE POLITIQUE DE PROTECTION DE LA VIE PRIVÉE" />
        <Text text="Nous avons comme politique de publier sur cette page toute modification apportée à notre Politique de protection de la vie privée, ainsi qu’un avis indiquant que cette politique a été mise à jour sur la page d’accueil de nos sites Web et dans nos applications. Si nous apportons des modifications importantes à la manière dont nous traitons les renseignements personnels de nos utilisateurs, nous vous en informerons par l’entremise d’un avis sur la page d’accueil de notre site Web et dans notre application." />
        <Text text="Nous indiquons la date de la dernière révision de la Politique de protection de la vie privée dans la partie supérieure de la page. Il est de votre responsabilité de consulter régulièrement nos sites Web et la présente Politique de protection de la vie privée afin de vérifier si des modifications y ont été apportées." />
      </div>

      <div className="mt-6">
        <Title title="POUR NOUS CONTACTER" />
        <Text text="Vos questions, commentaires et demandes concernant la présente Politique de protection de la vie privée et nos pratiques en la matière sont les bienvenus. Vous pouvez nous contacter aux coordonnées ci-dessous." />
        <Text text="Responsable de la protection de la vie privée" />
        <Text text="Sutton Encore" />
        <Text text="4c Rue Maple, Sutton, QC J0E 2K0" withTopMargin={false} />
        <Text text="info@suttonencore.com" withTopMargin={false} />
        <Text text="+14505380486" withTopMargin={false} />
        <Text text="Nous avons mis en place des procédures pour recevoir les plaintes et les demandes de renseignements concernant la manière dont nous traitons les renseignements personnels et dont nous nous conformons à la présente politique et aux lois applicables en matière de protection de la vie privée, ainsi que pour y répondre." />
      </div>

      <div className="mt-6">
        <Title title="DATE DE RÉVISION" />
        <Text text="La présente politique a été mise à jour pour la dernière fois le 24 mai 2024." />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
