
import { Card, CardContent, CardFooter} from "@/components/ui/card"

export function SkeletonCard() {
  return (
    <div className="flex overflow-hidden">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]">
          <Card className="overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg group bg-peach-100 animate-pulse-slow">
            <CardContent className="relative flex aspect-[3/4] items-center justify-center p-0">
              <div className="w-full h-full bg-peach-300 rounded-t-xl"></div>
              <div className="absolute top-2 right-2 w-8 h-8 bg-peach-300 rounded-full"></div>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-peach-300"></div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-2 bg-peach-50">
              <div className="flex justify-between items-start w-full mb-1">
                <div>
                  <div className="h-4 bg-peach-300 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-peach-300 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-peach-300 rounded w-1/4"></div>
              </div>
              <div className="flex justify-between items-center w-full mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-4 h-4 bg-peach-300 rounded-full"></div>
                  ))}
                </div>
                <div className="h-8 w-24 bg-peach-300 rounded"></div>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
