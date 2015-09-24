(function(){"use strict";window.GOVUK=window.GOVUK||{},window.GOVUK.Transactions={trackStartPageTabs:function(e){var t=e.target.href;GOVUK.analytics.trackEvent("startpages","tab",{label:t,nonInteraction:!0})}}})(),$(document).ready(function(){var e=$("section.more");e.find(".js-tabs").length&&e.tabs(),$("form#completed-transaction-form").append('<input type="hidden" name="service_feedback[javascript_enabled]" value="true"/>').append($('<input type="hidden" name="referrer">').val(document.referrer||"unknown")),$("#completed-transaction-form button.button").click(function(){$(this).attr("disabled","disabled"),$(this).parents("form").submit()}),$(".transaction .nav-tabs a").click(window.GOVUK.Transactions.trackStartPageTabs)}),jQuery(function(e){var t=e("figure a[href*='https://www.youtube.com/watch']");e.each(t,function(t){var n=e("<span />");e(this).parent().replaceWith(n);var r=e(this).siblings(".captions"),i=e(r).length>0?e(r).attr("href"):null,s=e(this).attr("href").split("=")[1],o=document.location.protocol+"//www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=";n.player({id:"yt"+t,media:s,captions:i,url:o,flashHeight:"350px"})})}),function(){"use strict";function e(e){var t=typeof ieVersion=="undefined"||ieVersion>7?!0:!1;this.$filter=e.el,this.$checkboxResetter=this.$filter.find(".clear-selected"),this.$checkboxes=this.$filter.find("input[type='checkbox']"),this.$checkboxResetter.on("click",$.proxy(this.resetCheckboxes,this)),this.$checkboxes.on("click",$.proxy(this.updateCheckboxes,this)),this.$checkboxes.on("focus",$.proxy(this.ensureFinderIsOpen,this)),(this.isOpen()||!t)&&this.setupHeight(),t&&(this.$filter.find(".head").on("click",$.proxy(this.toggleFinder,this)),this.$filter.on("focus",$.proxy(this.listenForKeys,this)),this.$filter.on("blur",$.proxy(this.stopListeningForKeys,this)))}window.GOVUK=window.GOVUK||{},e.prototype.setupHeight=function(){var t=this.$filter.find(".checkbox-container"),n=t.children("ul"),r=t.height(),i=n.height();i<r?t.height(i):n.height()<r+50&&t.height(n.height())},e.prototype.isOpen=function(){return!this.$filter.hasClass("closed")},e.prototype.open=function(){this.$filter.removeClass("closed"),this.setupHeight()},e.prototype.close=function(){this.$filter.addClass("closed")},e.prototype.listenForKeys=function(){this.$filter.keypress($.proxy(this.checkForSpecialKeys,this))},e.prototype.checkForSpecialKeys=function(t){t.keyCode==13&&this.toggleFinder()},e.prototype.stopListeningForKeys=function(){this.$filter.unbind("keypress")},e.prototype.ensureFinderIsOpen=function(){this.$filter.hasClass("closed")&&this.open()},e.prototype.toggleFinder=function(){this.$filter.hasClass("closed")?this.open():this.close()},e.prototype.resetCheckboxes=function(){return this.$filter.find("input[type='checkbox']").prop({indeterminate:!1,checked:!1}).trigger("change"),this.$checkboxResetter.addClass("js-hidden"),!1},e.prototype.updateCheckboxes=function(t){var n=$(t.target).prop("checked"),r=$(t.target).parent(),i=r.siblings();r.find('input[type="checkbox"]').prop({indeterminate:!1,checked:n}),this.checkSiblings(r,n),this.updateCheckboxResetter()},e.prototype.checkSiblings=function(t,n){var r=t.parent().parent(),i=!0;t.siblings().each(function(){return i=$(this).children('input[type="checkbox"]').prop("checked")===n}),i?(r.children('input[type="checkbox"]').prop({indeterminate:!1,checked:n}),this.checkSiblings(r,i)):t.parents("li").children('input[type="checkbox"]').prop({indeterminate:!0,checked:!1})},e.prototype.updateCheckboxResetter=function(){var t=this.$checkboxes.is(":checked"),n=this.$checkboxResetter.hasClass("js-hidden");t&&n?this.$checkboxResetter.removeClass("js-hidden"):!t&&!n&&this.$checkboxResetter.addClass("js-hidden")},GOVUK.CheckboxFilter=e}(),typeof window.GOVUK=="undefined"&&(window.GOVUK={}),typeof window.GOVUK.support=="undefined"&&(window.GOVUK.support={}),window.GOVUK.support.history=function(){return window.history&&window.history.pushState&&window.history.replaceState},function(){"use strict";window.GOVUK=window.GOVUK||{};var e={action:!1,state:!1,previousState:!1,resultCache:{},$form:!1,$resultCount:!1,$ariaLiveResultCount:!1,init:function(){GOVUK.support.history()?(e.$form=$(".js-live-search-form"),e.$ariaLiveResultCount=$(".js-aria-live-count"),e.$form&&(e.$resultsBlock=$(".js-live-search-results-block"),e.action=e.$form.attr("action")+".json",e.saveState(),e.$form.on("change","input[type=checkbox]",e.checkboxChange),$(window).on("popstate",e.popState))):$(".js-live-search-fallback").show()},popState:function(t){t.originalEvent.state&&(e.saveState(state),e.updateResults(),e.restoreCheckboxes(),e.pageTrack())},pageTrack:function(){GOVUK.analytics.setResultCountDimension(e.cache().result_count),GOVUK.analytics.trackPageview()},checkboxChange:function(t){var n;e.checkFilterLimit(t)&&e.isNewState()&&(e.saveState(),n=e.updateResults(),n.done(function(){history.pushState(e.state,"",window.location.pathname+"?"+$.param(e.state)),e.pageTrack()}))},checkFilterLimit:function(t){var n=e.$form.serializeArray(),r=0,i,s;for(i=0,s=n.length;i<s;i++)n[i].name.lastIndexOf("filter_",0)===0&&(r+=1);return r>=15?($(t.target).prop("checked",!1),alert("You can only apply 15 filters at once. Please remove a filter before adding one"),!1):!0},cache:function(t){if(typeof t=="undefined")return e.resultCache[$.param(e.state)];e.resultCache[$.param(e.state)]=t},isNewState:function(){return $.param(e.state)!==e.$form.serialize()},saveState:function(t){typeof t=="undefined"&&(t=e.$form.serializeArray()),e.previousState=e.state,e.state=t},updateResults:function(){if(typeof e.cache()=="undefined")return e.showLoadingIndicator(),$.ajax({url:e.action,data:e.state}).done(function(t){e.cache(t),e.hideLoadingIndicator(),e.displayResults()}).error(function(){e.showErrorIndicator()});e.displayResults();var t=new $.Deferred;return t.resolve()},showLoadingIndicator:function(){e.$resultCount=$("#js-live-search-result-count"),e._resultCountText=e.$resultCount.text(),e.$resultCount.text("Loading...")},hideLoadingIndicator:function(){e.$resultCount.text(e._resultCountText)},showErrorIndicator:function(){e.$resultCount.text("Error. Please try modifying your search and trying again")},displayResults:function(){var t=e.cache();e.searchTermValue(e.previousState)===e.searchTermValue(e.state)?e.$resultsBlock.find(".js-live-search-results-list").mustache("search/_results_list",t):(e.$resultsBlock.mustache("search/_results_block",t),e.$resultsBlock.find(".js-openable-filter").each(function(){new GOVUK.CheckboxFilter({el:$(this)})})),e.updateAriaLiveCount()},restoreCheckboxes:function(){e.$form.find("input[type=checkbox]").each(function(t,n){var r=$(n);r.prop("checked",e.isCheckboxSelected(r.attr("name"),r.attr("value")))})},isCheckboxSelected:function(t,n){var r,i;for(r=0,i=e.state.length;r<i;r++)if(e.state[r].name===t&&e.state[r].value===n)return!0;return!1},searchTermValue:function(e){if(!e)return!1;var t,n;for(t=0,n=e.length;t<n;t++)if(e[t].name==="q")return e[t].value;return!1},updateAriaLiveCount:function(){e.$ariaLiveResultCount.text(e.$resultsBlock.find(".result-count").text())}};GOVUK.liveSearch=e}(),function(e){"use strict";var t={},n=!1,r=function(n){return typeof t[n]=="undefined"&&(document.getElementById(n)?t[n]=e("<div />").html(e(document.getElementById(n)).html().trim()).text():window.templates&&templates[n]&&(t[n]=templates[n])),t[n]},i=function(){var r;if(n===!1)if(typeof window.templates=="undefined")e('script[type="text/mustache"]').each(function(n,i){r=e(i).attr("id"),t[r]=e("<div />").html(e(i).html().trim()).text()});else if(window.templates)for(r in templates)t[r]=templates[r]},s=function(n,s){i();var o=r(n);if(typeof o=="undefined")e.error("Unknown template "+n);else if(typeof o=="object")return o.render(s,t);if(window.Hogan)return window.Hogan.compile(o).render(s,t);e.error("Must have Hogan.js to load string templates")};e.fn.mustache=function(e,t){return this.html(s(e,t))},e.mustache=function(e,t){return s(e,t)}}(jQuery),typeof window.Hogan=="undefined"&&(window.Hogan={}),function(e,t){function a(e){return String(e===null||e===undefined?"":e)}function f(e){return e=a(e),u.test(e)?e.replace(n,"&amp;").replace(r,"&lt;").replace(i,"&gt;").replace(s,"&#39;").replace(o,"&quot;"):e}e.Template=function(e,n,r,i){this.r=e||this.r,this.c=r,this.options=i,this.text=n||"",this.buf=t?[]:""},e.Template.prototype={r:function(e,t,n){return""},v:f,t:a,render:function(t,n,r){return this.ri([t],n||{},r)},ri:function(e,t,n){return this.r(e,t,n)},rp:function(e,t,n,r){var i=n[e];return i?(this.c&&typeof i=="string"&&(i=this.c.compile(i,this.options)),i.ri(t,n,r)):""},rs:function(e,t,n){var r=e[e.length-1];if(!l(r)){n(e,t,this);return}for(var i=0;i<r.length;i++)e.push(r[i]),n(e,t,this),e.pop()},s:function(e,t,n,r,i,s,o){var u;return l(e)&&e.length===0?!1:(typeof e=="function"&&(e=this.ls(e,t,n,r,i,s,o)),u=e===""||!!e,!r&&u&&t&&t.push(typeof e=="object"?e:t[t.length-1]),u)},d:function(e,t,n,r){var i=e.split("."),s=this.f(i[0],t,n,r),o=null;if(e==="."&&l(t[t.length-2]))return t[t.length-1];for(var u=1;u<i.length;u++)s&&typeof s=="object"&&i[u]in s?(o=s,s=s[i[u]]):s="";return r&&!s?!1:(!r&&typeof s=="function"&&(t.push(o),s=this.lv(s,t,n),t.pop()),s)},f:function(e,t,n,r){var i=!1,s=null,o=!1;for(var u=t.length-1;u>=0;u--){s=t[u];if(s&&typeof s=="object"&&e in s){i=s[e],o=!0;break}}return o?(!r&&typeof i=="function"&&(i=this.lv(i,t,n)),i):r?!1:""},ho:function(e,t,n,r,i){var s=this.c,o=this.options;o.delimiters=i;var r=e.call(t,r);return r=r==null?String(r):r.toString(),this.b(s.compile(r,o).render(t,n)),!1},b:t?function(e){this.buf.push(e)}:function(e){this.buf+=e},fl:t?function(){var e=this.buf.join("");return this.buf=[],e}:function(){var e=this.buf;return this.buf="",e},ls:function(e,t,n,r,i,s,o){var u=t[t.length-1],a=null;if(!r&&this.c&&e.length>0)return this.ho(e,u,n,this.text.substring(i,s),o);a=e.call(u);if(typeof a=="function"){if(r)return!0;if(this.c)return this.ho(a,u,n,this.text.substring(i,s),o)}return a},lv:function(e,t,n){var r=t[t.length-1],i=e.call(r);if(typeof i=="function"){i=a(i.call(r));if(this.c&&~i.indexOf("{{"))return this.c.compile(i,this.options).render(r,n)}return a(i)}};var n=/&/g,r=/</g,i=/>/g,s=/\'/g,o=/\"/g,u=/[&<>\"\']/,l=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"}}(typeof exports!="undefined"?exports:Hogan),window.templates={},window.templates["search/_results"]=new Hogan.Template(function(e,t,n){var r=this;return r.b(n=n||""),r.s(r.f("results",e,t,1),e,t,0,12,2298,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.s(r.f("is_multiple_results",e,t,1),e,t,0,39,282,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b("    <li class='descoped-results'>"),r.b("\n"+n),r.b("      <div class='descope-message'>"),r.b("\n"+n),r.b("        <a href='/search?q="),r.b(r.v(r.f("query",e,t,0))),r.b("'>Display "),r.b(r.v(r.f("unscoped_result_count",e,t,0))),r.b(" from all of GOV.UK</a>"),r.b("\n"+n),r.b("      </div>"),r.b("\n"+n),r.b("      <ol>"),r.b("\n"+n),r.b(r.rp("search/_results",e,t,"        ")),r.b("      </ol>"),r.b("\n"+n),r.b("    </li>"),r.b("\n")}),e.pop()),r.s(r.f("is_multiple_results",e,t,1),e,t,1,0,0,"")||(r.b("    <li>"),r.b("\n"+n),r.b('      <h3><a href="'),r.b(r.v(r.f("link",e,t,0))),r.b('" '),r.s(r.f("external",e,t,1),e,t,0,385,399,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b('rel="external"')}),e.pop()),r.b(">"),r.b(r.v(r.f("title",e,t,0))),r.b("</a></h3>"),r.b("\n"+n),r.b("\n"+n),r.s(r.f("debug_score",e,t,1),e,t,0,455,695,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('        <p class="debug-link">'),r.b("\n"+n),r.b("          "),r.b(r.v(r.f("link",e,t,0))),r.b("\n"+n),r.b("        </p>"),r.b("\n"+n),r.b('        <p class="debug-info">'),r.b("\n"+n),r.b("          <span>Score: "),r.b(r.v(r.f("es_score",e,t,0))),r.b("</span>"),r.b("\n"+n),r.b("          <span>Format: "),r.s(r.f("government",e,t,1),e,t,0,632,642,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b("government")}),e.pop()),r.b(" "),r.b(r.v(r.f("format",e,t,0))),r.b("</span>"),r.b("\n"+n),r.b("        </p>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.s(r.f("external",e,t,1),e,t,0,732,886,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('        <p class="meta">'),r.b("\n"+n),r.b('          <span class="visuallyhidden">Part of </span>'),r.b("\n"+n),r.b('          <span class="url">'),r.b(r.v(r.f("display_link",e,t,0))),r.b("</span>"),r.b("\n"+n),r.b("        </p>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.s(r.f("metadata_any?",e,t,1),e,t,0,925,1057,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('        <ul class="attributes">'),r.b("\n"+n),r.s(r.f("metadata",e,t,1),e,t,0,981,1023,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b("            <li> "),n.b(n.t(n.d(".",e,t,0))),n.b(" </li>"),n.b("\n")}),e.pop()),r.b("        </ul>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.s(r.f("historic?",e,t,1),e,t,0,1097,1261,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.s(r.f("government_name",e,t,1),e,t,0,1126,1234,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('        <p class="historic">'),r.b("\n"+n),r.b("          First published during the "),r.b(r.v(r.f("government_name",e,t,0))),r.b("\n"+n),r.b("        </p>"),r.b("\n")}),e.pop())}),e.pop()),r.b("\n"+n),r.b("      <p>"),r.b(r.v(r.f("description",e,t,0))),r.b("</p>"),r.b("\n"+n),r.b("\n"+n),r.s(r.f("sections_present?",e,t,1),e,t,0,1335,1497,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('        <ul class="sections">'),r.b("\n"+n),r.s(r.f("sections",e,t,1),e,t,0,1389,1463,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b('            <li><a href="'),n.b(n.v(n.f("link",e,t,0))),n.b("#"),n.b(n.v(n.f("hash",e,t,0))),n.b('">'),n.b(n.v(n.f("title",e,t,0))),n.b("</a></li>"),n.b("\n")}),e.pop()),r.b("        </ul>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.s(r.f("examples_present?",e,t,1),e,t,0,1549,1999,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('        <ul class="examples">'),r.b("\n"+n),r.s(r.f("examples",e,t,1),e,t,0,1603,1742,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b("            <li>"),r.b("\n"+n),r.b('              <h4><a href="'),r.b(r.v(r.f("link",e,t,0))),r.b('">'),r.b(r.v(r.f("title",e,t,0))),r.b("</a></h4>"),r.b("\n"+n),r.b("              <p>"),r.b(r.v(r.f("description",e,t,0))),r.b("</p>"),r.b("\n"+n),r.b("            </li>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.s(r.f("suggested_filter_present?",e,t,1),e,t,0,1797,1948,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b("            <li>"),r.b("\n"+n),r.b('              <h4 class="see-all"><a href="'),r.b(r.v(r.f("suggested_filter_link",e,t,0))),r.b('">'),r.b(r.v(r.f("suggested_filter_title",e,t,0))),r.b("</a><h4>"),r.b("\n"+n),r.b("            </li>"),r.b("\n")}),e.pop()),r.b("        </ul>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.s(r.f("examples_present?",e,t,1),e,t,1,0,0,"")||r.s(r.f("suggested_filter_present?",e,t,1),e,t,0,2090,2200,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b('          <h4 class="see-all"><a href="'),n.b(n.v(n.f("suggested_filter_link",e,t,0))),n.b('">'),n.b(n.v(n.f("suggested_filter_title",e,t,0))),n.b("</a><h4>"),n.b("\n")}),e.pop()),r.b("\n"+n),r.b("    </li>"),r.b("\n"))}),e.pop()),r.fl()}),window.templates["search/_results_block"]=new Hogan.Template(function(e,t,n){var r=this;return r.b(n=n||""),r.s(r.d("filter_fields.any?",e,t,1),e,t,0,23,1188,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('  <div class="filter-form">'),r.b("\n"+n),r.b('    <div class="inner-block">'),r.b("\n"+n),r.b('      <p class="info">Filter by:</p>'),r.b("\n"+n),r.b("\n"+n),r.s(r.f("filter_fields",e,t,1),e,t,0,144,1016,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('        <div class="filter checkbox-filter js-openable-filter '),r.s(r.d("options.any?",e,t,1),e,t,1,0,0,"")||r.b("closed"),r.b('" tabindex="0">'),r.b("\n"+n),r.b('          <div class="head">'),r.b("\n"+n),r.b('            <span class="legend">'),r.b(r.v(r.f("field_title",e,t,0))),r.b("</span>"),r.b("\n"+n),r.b('            <div class="controls">'),r.b("\n"+n),r.b('              <a class="clear-selected '),r.s(r.d("options.any?",e,t,1),e,t,1,0,0,"")||r.b(" js-hidden"),r.b('">Remove filters</a>'),r.b("\n"+n),r.b('              <div class="toggle"></div>'),r.b("\n"+n),r.b("            </div>"),r.b("\n"+n),r.b("          </div>"),r.b("\n"+n),r.b('          <div class="checkbox-container" id="'),r.b(r.v(r.f("field",e,t,0))),r.b('-filter">'),r.b("\n"+n),r.b("            <ul>"),r.b("\n"+n),r.s(r.d("options.options",e,t,1),e,t,0,680,939,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b("                <li>"),r.b("\n"+n),r.b('                  <input type="checkbox" name="filter_'),r.b(r.v(r.f("field",e,t,0))),r.b('[]" value="'),r.b(r.v(r.f("slug",e,t,0))),r.b('" id="'),r.b(r.v(r.f("slug",e,t,0))),r.b('" '),r.s(r.f("checked",e,t,1),e,t,0,812,819,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b("checked")}),e.pop()),r.b(">"),r.b("\n"+n),r.b("                  <label for='"),r.b(r.v(r.f("slug",e,t,0))),r.b("'>"),r.b(r.v(r.f("title",e,t,0))),r.b(" ("),r.b(r.v(r.f("count",e,t,0))),r.b(")</label>"),r.b("\n"+n),r.b("                </li>"),r.b("\n")}),e.pop()),r.b("            </ul>"),r.b("\n"+n),r.b("          </div>"),r.b("\n"+n),r.b("        </div>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.b('      <div class="submit js-live-search-fallback">'),r.b("\n"+n),r.b('        <input type="submit" class="button" value="Submit filters">'),r.b("\n"+n),r.b("      </div>"),r.b("\n"+n),r.b("    </div>"),r.b("\n"+n),r.b("  </div>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.b('<div class="results-block">'),r.b("\n"+n),r.b('  <div class="inner-block js-live-search-results-list">'),r.b("\n"+n),r.b(r.rp("search/_results_list",e,t,"    ")),r.b("  </div>"),r.b("\n"+n),r.b("</div>"),r.b("\n"),r.fl()}),window.templates["search/_results_list"]=new Hogan.Template(function(e,t,n){var r=this;return r.b(n=n||""),r.b('<div class="result-count '),r.s(r.f("is_scoped?",e,t,1),e,t,0,40,61,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b(" scoped-result-count ")}),e.pop()),r.b('" id="js-live-search-result-count" aria-hidden=\'true\'>'),r.b("\n"+n),r.s(r.f("is_scoped?",e,t,1),e,t,0,148,390,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b("    <strong>"),r.b(r.v(r.f("result_count_string",e,t,0))),r.b(" found in</strong><br>"),r.b("\n"+n),r.b("    "),r.b(r.v(r.f("scope_title",e,t,0))),r.b("<br>"),r.b("\n"+n),r.s(r.f("unscoped_results_any?",e,t,1),e,t,0,263,361,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b("      <a href='/search?q="),n.b(n.v(n.f("query",e,t,0))),n.b("'>Display "),n.b(n.v(n.f("unscoped_result_count",e,t,0))),n.b(" from all of GOV.UK</a>"),n.b("\n")}),e.pop())}),e.pop()),r.s(r.f("is_scoped?",e,t,1),e,t,1,0,0,"")||(r.b("    "),r.b(r.v(r.f("result_count_string",e,t,0))),r.b(" found"),r.b("\n")),r.b("</div>"),r.b("\n"+n),r.b("\n"+n),r.s(r.f("results_any?",e,t,1),e,t,0,503,1246,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('  <ol class="results-list'),r.s(r.f("debug_score",e,t,1),e,t,0,545,551,"{{ }}")&&(r.rs(e,t,function(e,t,n){n.b(" debug")}),e.pop()),r.b('" id="js-live-search-results" start="'),r.b(r.v(r.f("first_result_number",e,t,0))),r.b('">'),r.b("\n"+n),r.b(r.rp("search/_results",e,t,"    ")),r.b("  </ol>"),r.b("\n"+n),r.b('  <ul class="previous-next-navigation">'),r.b("\n"+n),r.s(r.f("has_previous_page?",e,t,1),e,t,0,730,958,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('      <li class="previous">'),r.b("\n"+n),r.b('        <a href="'),r.b(r.v(r.f("previous_page_link",e,t,0))),r.b('">'),r.b("\n"+n),r.b('          Previous <span class="visuallyhidden">page</span>'),r.b("\n"+n),r.b('          <span class="page-numbers">'),r.b(r.v(r.f("previous_page_label",e,t,0))),r.b("</span>"),r.b("\n"+n),r.b("        </a>"),r.b("\n"+n),r.b("      </li>"),r.b("\n")}),e.pop()),r.b("\n"+n),r.s(r.f("has_next_page?",e,t,1),e,t,0,1006,1218,"{{ }}")&&(r.rs(e,t,function(e,t,r){r.b('      <li class="next">'),r.b("\n"+n),r.b('        <a href="'),r.b(r.v(r.f("next_page_link",e,t,0))),r.b('">'),r.b("\n"+n),r.b('          Next <span class="visuallyhidden">page</span>'),r.b("\n"+n),r.b('          <span class="page-numbers">'),r.b(r.v(r.f("next_page_label",e,t,0))),r.b("</span>"),r.b("\n"+n),r.b("        </a>"),r.b("\n"+n),r.b("      </li>"),r.b("\n")}),e.pop()),r.b("  </ul>"),r.b("\n")}),e.pop()),r.s(r.f("results_any?",e,t,1),e,t,1,0,0,"")||(r.b('  <div class="zero-results">'),r.b("\n"+n),r.b("    <h2>Please try:</h2>"),r.b("\n"+n),r.b("    <ul>"),r.b("\n"+n),r.b("      <li>searching again using different words</li>"),r.b("\n"+n),r.b("      <li>removing your filters</li>"),r.b("\n"+n),r.b("    </ul>"),r.b("\n"+n),r.b("    <h2>Older content</h2>"),r.b("\n"+n),r.b("    <p>"),r.b("\n"+n),r.b("      Not all government content published before 2010 is on GOV.UK."),r.b("\n"+n),r.b('      To find older content try searching <a href="http://webarchive.nationalarchives.gov.uk/adv_search/?query='),r.b(r.v(r.f("query",e,t,0))),r.b('">The National Archives</a>.'),r.b("\n"+n),r.b("    </p>"),r.b("\n"+n),r.b("  </div>"),r.b("\n")),r.fl()}),function(){"use strict";function t(e){e.is("a")?e.on("mousedown keydown",this.track):e.on("mousedown keydown","a[rel=external]",this.track)}window.GOVUK=window.GOVUK||{};var e=window.jQuery;t.prototype.track=function(t){var n=e(t.target),r=n.attr("href");if(t.type==="keydown"&&t.keyCode!==13)return!0;r.indexOf("/g?url=")!==0&&n.attr("href","/g?url="+window.encodeURIComponent(r))},GOVUK.TrackExternalLinks=t}(),function(){"use strict";window.GOVUK=window.GOVUK||{};var e=window.jQuery,t={init:function(){var n=e("#results .results-list");t.enableLiveSearchCheckbox(n),t.trackExternalSearchClicks(n),t.trackSearchClicks(n),t.trackSearchResultsAndSuggestions(n)},buildSearchResultsData:function(e){var n={urls:[]},r=t.extractSearchURLs(e),i=t.extractSearchSuggestion();return r.length&&(n.urls=r.toArray()),i!==null&&(n.suggestion=i),n},enableLiveSearchCheckbox:function(t){t.length>0&&(e(".js-openable-filter").each(function(){new GOVUK.CheckboxFilter({el:e(this)})}),GOVUK.liveSearch.init())},extractSearchSuggestion:function(){var t=e(".spelling-suggestion a");return t.length?t.text():null},extractSearchURLs:function(t){function n(t,n){var r=e(n).find("h3 a");return r.parents(".descoped-results").length?e.makeArray(r.map(function(t,n){return{href:e(n).attr("href"),descoped:!0}})):{href:r.attr("href")}}return t.length<=0?[]:t.children().map(n)},trackExternalSearchClicks:function(e){e.length>0&&new GOVUK.TrackExternalLinks(e)},trackSearchClicks:function(t){if(t.length===0||!GOVUK.cookie)return;t.on("click","a",function(t){var n=e(t.target),r="",i,s,o,u=function(){var e=window.location.search,t=/(&|\?)start=([0-9]+)(&|$)/,n=0,r;return r=e.match(t),r!==null&&(n=parseInt(r[2],10)),n};n.closest("ul").hasClass("sections")&&(s=n.attr("href"),s.indexOf("#")>-1&&(r="&sublink="+s.split("#")[1]),n=n.closest("ul")),o=u(),i=n.closest("li").index()+o+1,GOVUK.analytics.callOnNextPage("setSearchPositionDimension","position="+i+r)})},trackSearchResultsAndSuggestions:function(e){var n=t.buildSearchResultsData(e);GOVUK.analytics!==undefined&&GOVUK.analytics.trackEvent!==undefined&&e.length&&GOVUK.analytics.trackEvent("searchResults","resultsShown",{label:JSON.stringify(n),nonInteraction:!0})}};GOVUK.search=t,GOVUK.search.init()}.call(this);