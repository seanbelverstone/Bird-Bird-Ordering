import orderRoutes from "./orderRoutes";
import authRoute from "./auth";

export default function(app) {
	orderRoutes(app);
	authRoute(app);
}