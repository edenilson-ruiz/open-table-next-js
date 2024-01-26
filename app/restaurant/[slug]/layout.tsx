import Header from "./components/Header";

export const metadata = {
    title: 'Restaurant Details | OpenTable',
    openGraph: {
        title: 'Restaurant Search | OpenTable',
        description: 'OpenTable is a...',
    },
}

export default function RestaurantLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { slug: string };
}) {
    return (
        <>
            <Header name={params.slug} />
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                {children}
            </div>
        </>
    );
}