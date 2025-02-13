import {ContentLayout} from "@/components/Layout/ContentLayout.tsx";
import {Link} from "react-router-dom";


import {Card, CardContent} from "@/components/ui/card.tsx";

export default function NotFoundPage() {
    return (
        <ContentLayout title="">
            <Card className="rounded-lg border-none mt-6 h-full">
                <CardContent className="p-6">
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col relative">
                            <img
                                src=""
                                alt="Placeholder Image"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col relative">
                            <p className="text-center text-2xl font-bold text-muted-foreground">Page Not Found</p>
                            <p className="text-center text-lg text-muted-foreground">The page you are looking for does
                                not exist.</p>
                            <Link to="/" className="text-center text-lg text-muted-foreground">
                                Go to main page
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    );
}
