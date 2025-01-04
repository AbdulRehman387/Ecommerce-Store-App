import DashboardUsers from '@/components/DashboardUsers/DashboardUsers';

const Users = async(props: any) => {

    let users:any = []
    const res = await fetch(`http://localhost:3000/api/getUsers`, {
        cache: 'no-store',
    });
    const result = await res.json()
    users = result


    return (
        <main className='h-[100vh] overflow-y-scroll'>
            <section className="bg-gray-100 h-full flex flex-col gap-y-8 items-center mt-20">
                <h2 className="text-4xl font-bold mt-5">Users</h2>
                <div className='w-full overflow-x-auto h-[80vh] overflow-y-auto'>
                    <DashboardUsers users={users} />
                </div>
            </section>
        </main>
    )
}

export default Users