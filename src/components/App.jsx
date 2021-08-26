import { LoginForm } from './account/LoginForm'
import { Main } from './Main'
import { RegisterForm } from './account/RegisterForm'
import { Switch, Route } from 'react-router-dom'
import { ProtectedRoute } from './Route/ProtectedRoute'

export const App = () => {
    
    
    return (
        <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/main" >
                <ProtectedRoute Component={Main} />
            </Route>
            <Route exact path="/register" component={RegisterForm} />
            <Route path="*" component={LoginForm} />
        </Switch>
    )
}
