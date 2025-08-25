import PageHeader from "@/components/global/PageHeader";
import MainNavigation from "@/components/global/MainNavigation";
import BlogHeader from "@/app/blog/articles/article-detail/components/blogHeader";
import AuthorComponent from "@/app/blog/articles/article-detail/components/authorComponent";
import Footer from "@/components/global/Footer";
import RelatedArticles from "@/components/sections/RelatedArticles";


export default function Page() {

    return (
        <>
            <MainNavigation/>
            <PageHeader title={''}/>
            <main className={`relative`}>
                <BlogHeader
                    title={'More Shockwaves from the Harvey Weinstein Scandal: What Corporate Counsel Should Keep in Mind'}
                    date={'Wed, Mar 5th, 2025'}
                    category={'Press Relase'}
                    author={'Miles Mediation'}
                />
                <div className={'container mx-auto pt-60'}>
                    <p>
                        By Kim L. Kirn
                    </p>
                    <p>
                        Sexual harassment legislation keeps coming in the aftermath of the Harvey Weinstein scandal and
                        the resulting #Metoo Movement. Recently, the state of California enacted a bill protecting
                        survivors of sexual assault, sexual harassment, or discrimination by defining their speech as
                        privileged. Under the new law, any communication made “without malice, regarding an incident of
                        sexual assault, harassment, or discrimination” is considered privileged if the person making the
                        statement had a “reasonable basis” to file a complaint for sexual assault, sexual harassment, or
                        discrimination—regardless of whether a complaint is filed.
                    </p>

                    <p>
                        While the law is intended to encourage legitimate complaints of sexual harassment and sexual
                        assault by reducing the risk of baseless defamation claims, the factual issues around these
                        kinds of claims are often in dispute and may be difficult to prove. These cases also tend to be
                        steeped in emotion, and both parties
                        Additionally, Congress enacted the Speak Out Act, 18 USC 2246, which prohibits enforcement of
                        pre-dispute nondisclosure and non-disparagement clauses in sexual misconduct cases. After a
                        dispute arises, employers may include non-disclosure clauses in a settlement agreement, but
                        another law (Tax Cuts and Jobs Act) disallows employers from categorizing any payments as
                        business expenses. Bottom line: non-disclosure agreements will be tougher to enforce in the
                        future.
                    </p>

                    <p>
                        Here’s a closer look at some of the issues sexual misconduct claims present, and steps to take
                        when a sexual misconduct claim is made.
                    </p>

                    <p className={'text-lg font-bold mt-10'}>
                        Challenges the Parties Face

                    </p>


                    <p>
                        These cases tend to be emotionally laden. Plaintiffs may be traumatized by having to tell and
                        retell. The story may change over time as s/he becomes more comfortable with telling the full
                        story. This happens frequently. Keep in mind plaintiff is trying to protect his/her emotional
                        health. In addition, the time lag between the incident and the time of reporting is typically a
                        problem; the longer the time lag, the more difficult for both sides to prove their case.
                    </p>

                    <p>
                        It’s not only the time lag involved but the fact that these cases tend to have “he said/she
                        said” allegations. Typically, documentation of the relationship, both at work and
                        outside-of-work, exists such as emails, videos, or texts, but the behavior beyond that
                        documentation is often disputed. Moreover, you must determine context and meaning. Different
                        people may interpret communications/emojis/slang terms in a variety of ways.
                    </p>

                    <p>
                        The nature of the allegations involved in these cases can make them difficult to discuss. The
                        nature of sexual misconduct itself is uncomfortable for everyone to talk about. Plaintiffs may
                        file under the pseudonym John/Jane Doe to hide their identities; and of course, plaintiffs who
                        are minors will not be identified by name.
                    </p>

                    <p>
                        Challenges Defendants Face
                    </p>

                    <p>
                        Often the alleged harasser is upset, angry, and frustrated at the accusations. Most defendants
                        contend the allegations against them are untrue, were taken out of context, or were exaggerated.
                        Counsel may have a difficult time persuading the harasser of the high risk, publicity, and costs
                        of litigation.
                    </p>

                    <p>
                        Be forewarned: clients and witnesses may be telling “less than the full story.” It’s
                        embarrassing to talk about; clients fear what their co-workers will think; what their mothers
                        will think; and if you, as the lawyer, will judge them. Assume clients will hesitate to talk
                        about sexual misconduct.
                    </p>

                    <p>
                        Another complication occurs when the alleged perpetrator is no longer around. Maybe s/he is in
                        jail or is no longer at the same company. No one can count on the person’s cooperation or even
                        availability.
                    </p>

                    <p>
                        The Option of Mediation
                    </p>

                    <p>
                        For the foregoing reasons, attorneys on both sides of these disputes are increasingly turning to
                        alternative dispute resolution (ADR) options like mediation to resolve these issues. The private
                        nature of mediation is well-suited to resolve sexual misconduct cases.
                    </p>

                    <p>
                        Many times, plaintiffs feel guilty; they hesitate to report the sexual misconduct. As time
                        passes the cases become more difficult for both plaintiff and defendant. ADR protects the
                        party’s confidentiality, but it allows the plaintiffs to feel that their problems are being
                        addressed without the resulting publicity from a lawsuit. Moreover, plaintiffs must feel safe to
                        meaningful engage and mediation provides a safe, calm, and judgment-free environment. That
                        environment is the opposite of court, and good mediators gently remind the parties of that
                        difference.
                    </p>

                    <p>
                        Offer mediation to your opponent before suit is filled. Missouri federal and state courts are
                        ordering mediation routinely, so consider reminding your opponent that you will be going to
                        mediation anyway — so why not save the time and money and mediate first? Both plaintiff and
                        defendant should exchange opening demands and offers to allow each side to advise all the
                        necessary parties before the mediation. This gives us a much better chance to succeed at
                        mediation.
                    </p>

                </div>
                <div>
                    <AuthorComponent />
                </div>

                    <RelatedArticles className={'bg-[#b0dbdf] mt-60'} cardSize={'md'}  />

            </main>
            
            <Footer />

        </>
    )
}