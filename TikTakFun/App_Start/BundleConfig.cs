using System;
using System.Web.Optimization;

namespace TikTakFun
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
           
     
            bundles.Add(new ScriptBundle("~/bundles/GameScripts").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/game-ng-controller.js"));
;
        }
    }
}