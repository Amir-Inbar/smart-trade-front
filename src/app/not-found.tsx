import {ContentLayout} from "@/components/Layout/ContentLayout";

'use-client';

import Link from "next/link";
import Image from "next/image";

import {Card, CardContent} from "@/components/ui/card";

export default function NotFoundPage() {
    return (
        <ContentLayout title="">
            <Card className="rounded-lg border-none mt-6 h-full">
                <CardContent className="p-6">
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col relative">
                            <Image
                                src="/placeholder.png"
                                alt="Placeholder Image"
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col relative">
                            <p className="text-center text-2xl font-bold text-muted-foreground">Page Not Found</p>
                            <p className="text-center text-lg text-muted-foreground">The page you are looking for does
                                not exist.</p>
                            <Link href="/" className="text-center text-lg text-muted-foreground">
                                Go to main page
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    );
}
