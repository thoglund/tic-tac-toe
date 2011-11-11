function TicCtrl($cookieStore, $log) {
	var scope = this;
	
	var name = scope.getStoredName() || "";
	
	scope.getStoredName = function() {
		return $cookieStore.get("user_name");
	}
}
TicCtrl.$inject = [ '$cookieStore', '$log' ];