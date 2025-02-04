import { Button } from '../ui/button' 
import Sucess from '../../assets/Sucess.png' 


export function SuccessScreen() { return ( 
  
<div className="space-y-6 text-center"> <h1 className="text-4xl font-bold">Congratulations!</h1> 
<img src={Sucess} alt="Success" className="w-64 h-64 mx-auto" />
  <p className="text-xl">Welcome to Ulhim Platform!</p>
  <p className="text-gray-400">You are all set to explore, connect, and showcase your achievements!</p>
  <Button type="submit">
    Start Exploring
  </Button>
</div>
)
}