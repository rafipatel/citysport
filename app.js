// ============================================================
// CitySport T&C AI Assistant — Core Application
// RAG Pipeline + Pollinations API + Streaming UI
// ============================================================

// ── Configuration ────────────────────────────────────────────
const CONFIG = {
  apiBase: "https://gen.pollinations.ai/v1",
  apiKey: "sk_4q0kWflGY5LSgOIMtqe1OXXFfHKnFUhF",
  model: "gemini-search",
  maxContextClauses: 12,
  tcUrl: "https://www.citysport.org.uk/about/terms-and-conditions",
};

// ── T&C Knowledge Base (V3 Sep 2025) ─────────────────────────
const TC_SECTIONS = [
  {
    section: "1",
    title: "GENERAL INFORMATION",
    clauses: [
      {
        id: "1",
        text: `These are the terms and conditions of CitySport, part of City St George's, University of London ("City St George's"), a body established by Royal Charter and incorporated in England and Wales, a university and Member Institution of the University of London (registered number RC000121), whose registered office is at 10 Northampton Square, London, EC1V 0HB ("CitySport"). These terms and conditions ("T&Cs") set out the agreement between You and CitySport when You subscribe for a membership and/or otherwise use Our sports and fitness facilities located at 124 Goswell Road, Clerkenwell, London, EC1V 7DP. All Users of CitySport must comply with these T&Cs. By subscribing for a Membership, making a Booking to use CitySport, visiting CitySport for the purposes of attending a Booking made by another User, or using CitySport in any other manner, You agree to be bound by these T&Cs and any other documents referred to in them. "We", "Us" or "Our" means CitySport; and "You" or "Your" means any person who attends and makes use of CitySport. These T&Cs should be read in conjunction with Our privacy notice at https://www.citysport.org.uk/privacy-notice. These T&Cs may have changed since You last reviewed them. We reserve the right to amend these T&Cs at any time. If We amend these T&Cs, We will communicate the changes and any new T&Cs to You by email. Your continued use of CitySport will be deemed to indicate Your acceptance to the new T&Cs.`,
      },
    ],
  },
  {
    section: "2",
    title: "DEFINITIONS AND INTERPRETATION",
    clauses: [
      {
        id: "2",
        text: `The following definitions apply: Activities: the use of CitySport for the purpose of participating in Sports, Exercise Classes, or using the Gym. Block Booking: the reservation of multiple time slots across a period of time for use of certain CitySport facilities, including but not limited to studios or other areas of CitySport as agreed with Us, for Activities or any other use. Booking: the reservation of a single time slot for use of CitySport facilities for Activities or any other use. CitySport App: the "CitySport" software application owned and operated by CitySport and made available to Users. CitySport Rules: the rules and etiquette that all persons entering CitySport must adhere to, available at https://www.citysport.org.uk/about/centre-rules. CitySport Website: https://www.citysport.org.uk/. Event Booking: the reservation of certain parts of the CitySport facilities as agreed with Us for use for individual events. Exercise Classes: instructor-led group classes which are scheduled by CitySport from time to time and made available to users of CitySport. Gym: the exercise and fitness gymnasium facilities available at CitySport. Health Commitment Statement: a declaration of good health and being in a safe state to exercise, required when you first purchase a CitySport membership. Member: any individual who has subscribed for a Membership of CitySport and complies with the requirements set out in these T&Cs. Membership: Your membership subscription to use CitySport. Membership Fees: the fees for each Membership Option which are set by CitySport (at its sole discretion), payable by Members. A full price list is available at https://www.citysport.org.uk/memberships. Membership Option(s): the types of Memberships available to You to subscribe to. Reception: the front-of-house desk available upon entry into CitySport. RPI: the Retail Prices Index published by the Office for the National Statistics within the UK. Sports: the sporting activities offered by CitySport which include badminton, basketball, cheerleading, cricket, football, futsal, netball, pickleball, table tennis and volleyball. Sports Hall: those areas of CitySport which are made available for Sports or Event Bookings. User: any person (whether a Member or non-Member) who accesses and uses CitySport, its facilities and/or its services.`,
      },
    ],
  },
  {
    section: "3",
    title: "MEMBERSHIPS",
    clauses: [
      {
        id: "3.1",
        text: `You may register to become a Member of CitySport online via the CitySport LeisureHub platform, available via the CitySport Website and/or the CitySport App at https://bookings.citysport.org.uk/LhWeb/en/Public/Home ("LeisureHub").`,
      },
      {
        id: "3.2",
        text: `Details of the Membership Options available to You, including the duration, benefits, access rights and Membership Fees of the relevant Membership Option, are available at https://www.citysport.org.uk/memberships.`,
      },
      {
        id: "3.3",
        text: `In order to qualify for a specific Membership Option, You will be required to submit appropriate evidence to Us to confirm that You meet the eligibility criteria. Such evidence must be presented to Reception or emailed to citysport@citystgeorges.ac.uk. All evidence must be verified by a member of the CitySport staff before You will be accepted as a Member.`,
      },
      {
        id: "3.4",
        text: `When purchasing a Membership, You must agree to the Health Commitment Statement on LeisureHub and/or the CitySport App and are deemed to confirm that You are fit and healthy to exercise. If Your health deteriorates during Your membership in such a manner that You would no longer be able to agree to the Health Commitment Statement, You must inform Us promptly in writing.`,
      },
      {
        id: "3.5",
        text: `Payment of Membership Fees: Each of the fees for the following Membership Categories must be paid in advance at the time You register: (3.5.1) Annual Pre-paid & Fixed Term Memberships – You are required to pay in advance for a specific fixed term, payment is made in advance in one lump sum; (3.5.2) Pay As You Go Membership – a User who pays at the time of use for a single entry to CitySport.`,
      },
      {
        id: "3.6",
        text: `If the Membership Option you have subscribed for is for a term of at least 12 months, You may, where available, pay the Membership Fees by way of direct debit where payment is made on a monthly basis via automatic BACS payment ("Direct Debit Membership(s)").`,
      },
      {
        id: "3.7",
        text: `Direct Debit Memberships will be debited from Your bank account on the first working day in each calendar month.`,
      },
      {
        id: "3.8",
        text: `All Direct Debit Memberships: (3.8.1) form a binding contract between Us and You once You have registered; (3.8.2) have a minimum initial 12-month contract ("Initial Term"); and (3.8.3) automatically renew on a rolling basis for periods of one month each after the end of the Initial Term unless You give Us at least one month's written notice before the end of the Initial Term (or before the end of any subsequent month following the Initial Term) in accordance with Clause 3.22.`,
      },
      {
        id: "3.9",
        text: `If a Direct Debit Membership automatically renews in accordance with Clause 3.8.3, the Membership Fees payable by You may be increased in accordance with Clauses 3.13 and/or 3.14, and you will be responsible for paying the increased Membership Fees for each month after the Initial Term.`,
      },
      {
        id: "3.10",
        text: `If You have registered for a Direct Debit Membership and because of any act or omission by You, including but not limited to changing or cancelling Your direct debit details or having insufficient funds, We are unable to process any direct debit payments, You will remain liable for the payments for the remainder of the Initial Term. We reserve the right to: (3.10.1) cancel Your Direct Debit Membership; (3.10.2) seek payment of the relevant Membership Fees, including by pursuing legal proceedings; (3.10.3) charge You an administration fee for any costs incurred; (3.10.4) deny Your entry into CitySport; and/or (3.10.5) apply any future payments received to the debt You owe.`,
      },
      {
        id: "3.11",
        text: `Subject to Clauses 3.19 to 3.25, all Membership Fees paid in advance are non-refundable.`,
      },
      {
        id: "3.12",
        text: `Your Membership Fees shall remain payable throughout Your Membership regardless of how often You use CitySport or the other benefits of Your Membership.`,
      },
      {
        id: "3.13",
        text: `We reserve the right to review and amend the prices of Our Memberships at our discretion at any time throughout the year.`,
      },
      {
        id: "3.14",
        text: `Notwithstanding Our rights in Clause 3.13, the prices of Our Direct Debit Memberships will increase with effect from 1 August of each year up to or in line with any percentage increase in RPI as of April of that year. The percentage increase in RPI will be calculated by reference to the 12 month period from April to April of the relevant year.`,
      },
      {
        id: "3.15",
        text: `Any increase in prices under Clauses 3.13 and/or 3.14 will not apply to increase the Membership Fees payable by any Member who is within the initial term of their Annual Pre-Paid and Fixed Term Membership or Direct Debit Membership. Such Members will continue to pay the existing Membership Fees until termination or automatic renewal of their Membership.`,
      },
      {
        id: "3.16",
        text: `All of Our Membership Fees have already been adjusted to reflect the days that CitySport is closed during the year. These may include statutory holidays, any days where City St George's is officially closed, or staff training days. Members or other Users will not be eligible for any refunds or discounts in relation to such closures.`,
      },
      {
        id: "3.17",
        text: `Suspension of Your Membership: We reserve the right to suspend Your Membership in the event You have failed to pay any Membership Fees that have become due or if your registration as a student of City St George's is suspended. Your Membership will remain suspended until You have paid all overdue Membership Fees. You will not be allowed to register for a new or different Membership if You still have outstanding Membership Fees unpaid. You will not have access to CitySport during any period of suspension.`,
      },
      {
        id: "3.18",
        text: `You may suspend Your Membership (including the requirement to pay any Membership Fees) for a maximum of three months at any time during Your Membership due to medical reasons, provided that You submit evidence of such medical reasons. This may be in the form of a medical certificate, doctor's note or hospital letter. You will not have access to CitySport during any such period of suspension.`,
      },
      {
        id: "3.19",
        text: `Cancellation of Your Membership: If You register for a Membership with Us, You have 14 days from the date We confirm Your Membership to change Your mind and cancel Your Membership without penalty following the procedure in Clause 3.20. We will refund You for any Membership Fees paid in advance (minus any amount proportionate to Your use prior to cancellation). You will lose the right to cancel without a charge after this 14 day period.`,
      },
      {
        id: "3.20",
        text: `If You wish to cancel Your Membership during the first 14 days in accordance with Clause 3.19, You must contact Us via citysport@citystgeorges.ac.uk or completing the membership cancellation form at https://www.citysport.org.uk/contact-us. We will refund You as soon as possible and within 14 days of You telling Us. We will refund You using the same method You used for payment. You will remain liable for the costs of any use made prior to cancellation.`,
      },
      {
        id: "3.21",
        text: `If You have registered for and then cancelled a Membership within 14 days pursuant to Clauses 3.19 and 3.20, You will not be entitled to any further 14 day cancellation period if You subsequently re-register for a Membership in the future.`,
      },
      {
        id: "3.22",
        text: `If You wish to cancel a Direct Debit Membership at any time after the end of the Initial Term, You must give Us written notice of your intention to terminate before the 12th day of the month in which You wish to cancel. If (3.22.1) We receive Your notice before the 12th day, You will have access until the end of that month and Your Membership terminates without additional charge; or (3.22.2) We receive Your notice after the 12th day, we cannot cancel that month and You will be charged one further payment in the following month, but retain access until the end of that following month.`,
      },
      {
        id: "3.23",
        text: `If You have registered to become a Member but no longer meet the eligibility criteria for Your relevant Membership Option, You must inform Us immediately. We reserve the right to cancel Your Membership if You no longer meet the relevant eligibility criteria.`,
      },
      {
        id: "3.24",
        text: `Once You have registered to become a Member, You will only be entitled to cancel Your Membership before the end in the following circumstances by giving at least one full calendar month's notice in writing and providing appropriate evidence: (3.24.1) You become pregnant or suffer a major long-term injury or other significant physical medical issue – medical documentation required; (3.24.2) You are made redundant – a P45 or confirming documents required; or (3.24.3) You are a student of City St George's and You have either withdrawn from Your course or Your registration has been terminated.`,
      },
      {
        id: "3.25",
        text: `If You cancel Your membership for any of the above reasons before the end: (3.25.1) if You have outstanding Membership Fees payable, We reserve the right to require You to pay any outstanding fees; or (3.25.2) if You have paid in advance, We will refund an amount equivalent to the remaining period of Your Membership which has been cancelled (except we will not refund if you are a final year student who has withdrawn, been terminated or completed studies).`,
      },
      {
        id: "3.26",
        text: `Using CitySport as a Member: You may only use CitySport as allowed by the relevant Membership You have registered for. If You wish to use CitySport for Activities not covered by Your Membership, You will be required to pay separately as an ad-hoc Booking.`,
      },
      {
        id: "3.27",
        text: `Once Your registration as a Member has been confirmed, You will receive a CitySport Membership card or other form of identification. We may require a photograph of You to be taken which will be linked to Your Membership profile for verification.`,
      },
      {
        id: "3.28",
        text: `You must have either Your CitySport Membership card or identification, Your student card or Your City St George's staff identification card each time You visit CitySport. You may not be permitted to enter without valid identification.`,
      },
      {
        id: "3.29",
        text: `You must not allow anyone else to use Your Membership card, identification or profile. If You allow Your Membership details to be used by anyone else, Your Membership may be suspended or cancelled without a refund.`,
      },
      {
        id: "3.30",
        text: `Your Membership card is Your responsibility. If You lose Your Membership card, You can replace it for a cost of £10 at Reception. If Your card has been stolen, We will provide a replacement free of charge if You provide a crime reference number. Any lost cards found on CitySport premises will be given to the City St George's Security department.`,
      },
    ],
  },
  {
    section: "4",
    title: "BOOKINGS",
    clauses: [
      {
        id: "4.1",
        text: `Both Members and non-Members may make a Booking to use the facilities at CitySport for the purposes of the Activities.`,
      },
      {
        id: "4.2",
        text: `If Your Membership Option includes the relevant Booking You wish to make, You will be able to make the Booking free of charge. If Your Membership Option does not include the relevant Booking, You will be required to pay for the Booking. If You are a Member, you may be offered a discounted rate at Our discretion.`,
      },
      {
        id: "4.3",
        text: `All Bookings for Activities can be made online by submitting a booking request via the CitySport App, LeisureHub, or in person by visiting the CitySport Reception.`,
      },
      {
        id: "4.4",
        text: `Sometimes, We may decide to reject Your Bookings, for example, because You are not eligible or if the Booking has been mispriced by Us. When this happens, We let You know as soon as possible and refund any sums You have paid.`,
      },
      {
        id: "4.5",
        text: `If You have an outstanding debt with CitySport, whether for unpaid Membership Fees or otherwise, You will not be entitled to use CitySport or make a Booking. If You have paid for a Booking while having an outstanding debt, We reserve the right to apply such payment to Your debt.`,
      },
      {
        id: "4.6",
        text: `Members may make a Booking up to 14 days in advance, and non-Members may make a Booking up to 7 days in advance of the date of the relevant Activity.`,
      },
      {
        id: "4.7",
        text: `All Bookings are generally for timed slots of 55 minutes. The online booking system may state 60-minute bookings, although this time may include time for set-up, set-down, cleaning, or maintenance checks. You must vacate the relevant facility before the end of the booked time, or when instructed by staff.`,
      },
      {
        id: "4.8",
        text: `You will only be permitted to make a Booking for a maximum of three Activities per day.`,
      },
      {
        id: "4.9",
        text: `If You make a Booking, You will not be permitted to make another Booking which falls within the same time slot as Your original Booking, to maintain fairness in the allocation of Booking slots.`,
      },
      {
        id: "4.10",
        text: `All Bookings are for the sole use by You (and any other persons attending alongside You) and are not transferable. If You attempt to transfer a Booking, We may cancel Your Booking without refund, suspend Your Membership and/or restrict You from Booking further Activities for at least two weeks.`,
      },
      {
        id: "4.11",
        text: `You (or the User responsible for making the Booking) must attend and be present for the duration of the Booking. If not, We may cancel Your Booking without refund, deny Your ability to fulfil Your Booking and/or require Your removal from CitySport.`,
      },
      {
        id: "4.12",
        text: `When making Basketball half court bookings via LeisureHub, 'court 1+2' or 'court 5+6' needs to be selected to ensure the Booking is valid. If booked incorrectly, CitySport will be unable to facilitate the Booking, but will look to reschedule or refund if cancellation policies are followed.`,
      },
      {
        id: "4.13",
        text: `You agree that You will not seek to: (4.13.1) monopolise Bookings for personal gain, e.g. making a Booking at a popular time to profit by selling or transferring it; and/or (4.13.2) except for Block Bookings or Event Bookings, monetise or profit from individual Bookings, including requiring Users to pay a premium or separate fee. If We have reasonable evidence, We may cancel Your Membership without refund and restrict future Bookings.`,
      },
      {
        id: "4.14",
        text: `If You fail to attend a Booking for any reason, You will not be entitled to any refund for payments made in advance, unless failure was caused directly by Us, and We may charge You a "No-Show Fee" of £3. Users will not be permitted to re-enter or access CitySport until they have paid the No-Show Fee.`,
      },
      {
        id: "4.15",
        text: `Payment for Bookings: You must pay the fees for each Booking in full when You reserve Your Booking (online or in person). We will not confirm Your Booking until We have received payment.`,
      },
      {
        id: "4.16",
        text: `Block Bookings and Event Bookings: You may submit a request for an Event Booking or Block Booking by completing the online Booking Request Form at https://www.citysport.org.uk/facilities or by emailing sportbookings@citystgeorges.ac.uk.`,
      },
      {
        id: "4.17",
        text: `The prices for Block Bookings and Event Bookings are available upon request.`,
      },
      {
        id: "4.18",
        text: `If We accept a Block Booking or Event Booking, You must pay the fees in full at least 14 days before the scheduled date, or such other time period as specified by Us. If You fail to do so, Your Booking will be cancelled and the time slot released.`,
      },
      {
        id: "4.19",
        text: `On receipt of a Block Booking or Event Booking request, We reserve the right to accept or reject the request at Our discretion. We can also state additional conditions that must be complied with.`,
      },
      {
        id: "4.20",
        text: `If You wish to make a Block Booking or Event Booking involving children or vulnerable adults, or representing a supported organisation (charity, youth club or school), You must provide copies of any safeguarding policies at the time of making the Booking.`,
      },
      {
        id: "4.21",
        text: `Alongside confirmation of your booking, We will provide You with a copy of our safeguarding policies, available at https://www.citysport.org.uk/about/safeguarding, which must be adhered to.`,
      },
      {
        id: "4.22",
        text: `Guest Fees: If You are not a Member but intend to use CitySport for a court or studio Booking (even if the Booking was made by a Member), You are required to pay a Guest Fee per each Activity. This Guest Fee is payable on entry to CitySport.`,
      },
      {
        id: "4.23",
        text: `If You are a Member, You will be exempt from the Guest Fee. However, You will still be required to pay for Booking the Activity, unless it is included within Your Membership Option, in which case You may partake free of charge (subject to proper payment of Membership Fees).`,
      },
      {
        id: "4.24",
        text: `Cancelling Bookings: You may only cancel Block Bookings or Event Bookings by giving at least 5 full working days' notice from the date and time of the relevant Booking. Notice can be given by email to sportbookings@citystgeorges.ac.uk.`,
      },
      {
        id: "4.25",
        text: `In relation to ad hoc Bookings: (4.25.1) if You cannot attend, You may reschedule provided you give at least 1 full working day's notice; (4.25.2) a Booking can only be rescheduled once; (4.25.3) You are not permitted to cancel a Booking and will not be entitled to a refund. We may charge a No-Show Fee for failing to attend.`,
      },
      {
        id: "4.26",
        text: `For the purposes of Clauses 4.24 and 4.25, Saturdays and Sundays are not classed as "working days" even if the Booking is to take place on these days.`,
      },
      {
        id: "4.27",
        text: `If You ask Us to re-schedule any Bookings, We may be able to re-arrange to another time slot, but We reserve the right to charge a re-arrangement fee, up to the value of the Booking.`,
      },
      {
        id: "4.28",
        text: `Refund requests for ad-hoc Bookings must be emailed to citysport@citystgeorges.ac.uk or requested in person at Reception. Refund requests for Block Bookings or Event Bookings must be emailed to sportbookings@citystgeorges.ac.uk.`,
      },
      {
        id: "4.29",
        text: `Refunds for Bookings or Memberships made at Reception can only be refunded at Reception, while refunds for those made online can only be refunded online.`,
      },
      {
        id: "4.30",
        text: `Suspending Your Ability to Make Bookings: If You (4.30.1) fail to attend a Booking; and/or (4.30.2) repeatedly fail to pay for Bookings, We reserve the right to suspend Your ability to make new Bookings in future (online or in person).`,
      },
    ],
  },
  {
    section: "5",
    title: "GENERAL PAYMENT TERMS",
    clauses: [
      {
        id: "5.1",
        text: `Where applicable, VAT will be payable on all fees. If the rate of VAT changes between Your order date and the date We supply the service, We will adjust the rate of VAT that You pay, unless You have already paid in full before the change takes effect.`,
      },
      {
        id: "5.2",
        text: `Activity Booking prices are inclusive of VAT.`,
      },
      {
        id: "5.3",
        text: `Block Bookings and Event Bookings prices are exclusive of VAT.`,
      },
    ],
  },
  {
    section: "6",
    title: "OUR OPERATION OF THE FACILITIES",
    clauses: [
      {
        id: "6.1",
        text: `We may, from time to time, need to postpone, alter, cancel, or introduce new Activities temporarily or permanently for any reason, including customer feedback, or technical adjustments. We may also remove any equipment and withhold access to any part of CitySport for maintenance, repair, and alteration. If We take action which is likely to have a major impact on Your Membership, We will display notices and/or inform You by email at least one week in advance. If Your Booking is cancelled as a result, We will refund any amounts paid in advance.`,
      },
      {
        id: "6.2",
        text: `Except as provided for in Clause 6.3, We will not be under any obligation to reduce or refund any Membership Fees because of unavailability of services. This includes service training days.`,
      },
      {
        id: "6.3",
        text: `If We are prevented from providing Our services by an event outside Our control (civil commotion, war, industrial action, fire, flood, earthquake, pandemic, epidemic, acts of God, technical issues, etc.), We will contact You as soon as possible. If the delay is likely to exist for at least 3 months, You can contact Us via https://www.citysport.org.uk/contact-us to cancel Your Membership and receive a refund for Fees paid in advance but not benefited from.`,
      },
      {
        id: "6.4",
        text: `CCTV recording is in use throughout CitySport in accordance with the CCTV code of practice available at https://www.citystgeorges.ac.uk/about/governance/policies/cctv-code-of-practice-legacy-st-georges.`,
      },
    ],
  },
  {
    section: "7",
    title: "YOUR USE OF THE FACILITIES",
    clauses: [
      {
        id: "7.1",
        text: `It is Your sole responsibility to ensure that You, and any User attending with You or participating in any Booking made by You, complies with these T&Cs and the CitySport Rules.`,
      },
      {
        id: "7.2",
        text: `CitySport Memberships are only accessible to Users over the age of 16. Any Users under 16 must be accompanied by a parent or legal guardian at all times. We reserve the right to verify age and prevent access or require you to leave if you are under 16.`,
      },
      {
        id: "7.3",
        text: `Users aged 11 to 15 years old, with a valid Membership, may access the Gym when supervised by CitySport Fitness Instructors during dedicated Junior Gym sessions. Anyone found in the Gym under 16 not attending a Junior Gym session will be removed.`,
      },
      {
        id: "7.4",
        text: `Your use of CitySport is always subject to: (7.4.1) Your adherence to these T&Cs, the CitySport rules, Safeguarding policies, and any other rules pertaining to the relevant Activity, Booking, or area; and (7.4.2) the availability and any limits on capacity of any Activities or programmes offered.`,
      },
      {
        id: "7.5",
        text: `You must exercise due care and safety when using CitySport facilities. You agree and confirm that You are fit and healthy to exercise. It is Your duty to inform Us immediately if there are health conditions that may impact Your ability to use facilities safely.`,
      },
      {
        id: "7.6",
        text: `You must wear appropriate clothing and footwear at all times. If We determine You are not wearing appropriate clothing, We may cancel Your Booking without refund. Examples include sport-specific footwear with non-marking smooth-soles. Jeans must not be worn for any Activities in the Sports Hall.`,
      },
      {
        id: "7.7",
        text: `Lockers: (7.7.1) You should not store items overnight. We may cut padlocks and empty property nightly. Items left overnight will be kept in lost property for at least four weeks, after which We may dispose of them; (7.7.2) You must not place illegal, toxic, flammable, hazardous goods, food, perishable goods, or waste in lockers; (7.7.3) We have the right to access any locker at any time if necessary; (7.7.4) We accept no responsibility for criminal activity, including theft. Items left in lockers are at Your own risk.`,
      },
      {
        id: "7.8",
        text: `Users may not bring suitcases, large bags or storage containers unless they fit within the lockers or contain equipment strictly necessary for the Booking. CitySport will not be responsible for storing items and all items are left at Your own risk.`,
      },
      {
        id: "7.9",
        text: `You are not permitted to use CitySport while under the influence of alcohol or drugs.`,
      },
      {
        id: "7.10",
        text: `You are not permitted to bring any animals into CitySport, with the exception of guide dogs.`,
      },
      {
        id: "7.11",
        text: `You are not permitted to smoke or use any smoking alternatives such as vaping or e-cigarettes anywhere in CitySport or in the immediate vicinity.`,
      },
      {
        id: "7.12",
        text: `All photography or recordings within CitySport must comply with the CitySport Photography Policy, available at https://www.citysport.org.uk/home.`,
      },
      {
        id: "7.13",
        text: `If We deem that You have engaged in inappropriate conduct or failed to adhere to these T&Cs or rules, You may be asked to leave CitySport, and We may suspend or cancel Your Membership without refund. If you are a City St George's student, we may contact your school/department, who may take action under student disciplinary policies.`,
      },
      {
        id: "7.14",
        text: `We will check any sports equipment that You bring in to ensure it meets Our requirements. If Your equipment does not satisfy Our requirements, We may cancel Your Booking without refund.`,
      },
      {
        id: "7.15",
        text: `Bikes (including foldable versions), scooters, or any other means of individual transportation are not permitted to be brought into or stored inside CitySport, unless they fit within a locker. Items left outside are at Your own risk.`,
      },
      {
        id: "7.16",
        text: `If music is used for the Booking, the booker is responsible for ensuring PPL PRS licensing is properly secured by emailing universities@pplprs.co.uk. CitySport will not be liable for any music or media used by Users.`,
      },
      {
        id: "7.17",
        text: `When arriving for a Booking, the User who made the Booking must check in with Reception to register. We reserve the right to refuse entry and cancel Your Booking if the User who made the Booking is not present.`,
      },
      {
        id: "7.18",
        text: `Capacity limits for Activities: (7.18.1) Badminton, Pickleball, and Table Tennis: maximum 8 people per Booking; (7.18.2) Basketball, Football, and Volleyball (half hall): maximum 30 people per Booking; (7.18.3) Basketball (half court): maximum 15 people per Booking; and (7.18.4) Any show court Booking: maximum 50 people per Booking.`,
      },
    ],
  },
  {
    section: "8",
    title: "SPORTS HALL",
    clauses: [
      {
        id: "8.1",
        text: `Further details of Event Bookings for the Sports Hall, including dimensions, capacity and maximum occupancy are available on request.`,
      },
      {
        id: "8.2",
        text: `If an Event Booking for the Sports Hall exceeds the maximum occupancy numbers, We may cancel the Booking and/or require a proportion of attendees to leave. Our maximum occupancy numbers are based on risk assessments and health and safety requirements.`,
      },
      {
        id: "8.3",
        text: `We may require You to provide Your own protective floor covering for the Sports Hall if the intended activity may damage the floor.`,
      },
      {
        id: "8.4",
        text: `Any damage to the Sports Hall, including flooring and equipment, will be charged to You or the person responsible for the Event Booking. The full value of damages will be invoiced once We receive repair quotations.`,
      },
      {
        id: "8.5",
        text: `You must provide Your own risk assessment and evidence of liability insurance if the Event Booking relates to an activity that CitySport does not typically run.`,
      },
      {
        id: "8.6",
        text: `You must provide a safeguarding risk assessment if any attendees or spectators attending the Sports Hall via an Event Booking will be below 18 years.`,
      },
      {
        id: "8.7",
        text: `Except for Event Bookings where We have agreed that You may bring chilled food, We have a no food and hot drink policy in the Sports Hall. Bottled cold drinks are permitted, but alcohol is strictly prohibited.`,
      },
      {
        id: "8.8",
        text: `When using the Sports Hall, Users must ensure all bags, personal items or storage items are stored safely away from activity zones where they may pose a health and safety risk.`,
      },
    ],
  },
  {
    section: "9",
    title: "LIMITATION OF LIABILITY",
    clauses: [
      {
        id: "9.1",
        text: `We don't compensate You for all losses caused by Us during Your use of CitySport except as set out in this clause.`,
      },
      {
        id: "9.2",
        text: `We will be responsible for losses caused by Us breaching these T&Cs, unless the loss is: (9.2.1) unexpected and unforeseeable; (9.2.2) caused by a delaying event outside Our control; (9.2.3) avoidable by You taking reasonable action; or (9.2.4) a business loss.`,
      },
      {
        id: "9.3",
        text: `It is Your responsibility to seek advice from Your GP or medical practitioner before using CitySport. Any advice given by Our staff is provided in good faith and should not be relied upon if You have health conditions.`,
      },
      {
        id: "9.4",
        text: `We will not be liable for any injury, loss or damage to You or Your property while using CitySport, unless the injury, loss or damage is caused by Our negligence or wilful misconduct.`,
      },
      {
        id: "9.5",
        text: `Save in relation to Our negligence or wilful misconduct, We will not be liable for any claims for loss of enjoyment, loss of earnings or any other indirect or consequential loss arising from Your use of CitySport.`,
      },
      {
        id: "9.6",
        text: `In entering CitySport and/or partaking in any Activities, You acknowledge the inherent risks associated with physical exercise and accept full responsibility for Your participation.`,
      },
      {
        id: "9.7",
        text: `You acknowledge and agree that any damage to CitySport caused by You or any User who is part of Your Booking will be charged to You, with the full value of damages invoiced once repair quotations are received.`,
      },
    ],
  },
  {
    section: "10",
    title: "PERSONAL DATA",
    clauses: [
      {
        id: "10",
        text: `We will use Your personal data as set out in Our Privacy Notice: https://www.citysport.org.uk/privacy-notice.`,
      },
    ],
  },
  {
    section: "11",
    title: "DISPUTE RESOLUTION",
    clauses: [
      {
        id: "11.1",
        text: `You have several options for resolving disputes: (11.1.1) First, discuss with the Duty Manager on shift. (11.1.2) If the resolution does not meet your expectations, escalate to the relevant Manager by emailing citysport@citystgeorges.ac.uk. (11.1.3) Complaints may only be raised with the Head of Sport and Leisure after previous resolution attempts. Their decision is final. (11.1.4) If you are a City St George's student, please adhere to Regulation 26 Student Complaints process at https://www.citystgeorges.ac.uk/about/governance/policies/student-policies-and-regulations. (11.1.5) You can go to court. These T&Cs are governed by English law. You can bring claims in English courts; if You live in Wales, Scotland or Northern Ireland, You can also bring claims in the courts of the country You live in.`,
      },
    ],
  },
  {
    section: "12",
    title: "MISCELLANEOUS PROVISIONS",
    clauses: [
      {
        id: "12.1",
        text: `We can transfer Our contract with You so that a different organisation is responsible for supplying Your service. We'll tell You in writing if this happens and ensure the transfer won't affect Your rights.`,
      },
      {
        id: "12.2",
        text: `Nobody else has any rights under this contract. This contract is between You and Us. Nobody else can enforce it and neither party will need to ask anybody else to sign-off on ending or changing it.`,
      },
      {
        id: "12.3",
        text: `If a court invalidates some of this contract, the rest of it will still apply.`,
      },
      {
        id: "12.4",
        text: `Even if We delay in enforcing this contract, We can still enforce it later. We might not immediately chase You for not doing something (like paying) or for doing something You are not allowed to, but that doesn't mean We can't do it later.`,
      },
    ],
  },
];

// ── System Prompt ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the official CitySport Terms & Conditions Assistant. CitySport is part of City St George's, University of London, located at 124 Goswell Road, Clerkenwell, London, EC1V 7DP.

Your absolute primary directive is ACCURACY. You must act as a strict legal parser for the provided Terms & Conditions.

Your role:
- Answer questions ONLY based on the provided T&C context below or the facts established in the conversation history. Do NOT use outside knowledge. Do NOT hallucinate.
- Always accurately cite the specific clause numbers (e.g., "Clause 3.17", "Clause 4.14") backing up your answer.
- If the text provided in the context or history does NOT contain the answer, you must state: "I'm sorry, but I cannot find the specific answer to your query in the provided CitySport Terms & Conditions." and suggest the user check the full T&Cs at https://www.citysport.org.uk/about/terms-and-conditions or contact citysport@citystgeorges.ac.uk.
- Be highly professional, clear, and concise.
- Format responses with clear structure — use bullet points or numbered lists when extracting multiple rules.
- When referencing clause numbers, MUST format them as **Clause X.X** in bold.
- Do NOT provide legal advice. Direct users to seek professional legal counsel if needed.`;

// ── Retrieval Engine ─────────────────────────────────────────

// Build a flat index of all clauses for search
const CLAUSE_INDEX = [];
for (const section of TC_SECTIONS) {
  for (const clause of section.clauses) {
    CLAUSE_INDEX.push({
      sectionNum: section.section,
      sectionTitle: section.title,
      clauseId: clause.id,
      text: clause.text,
      // Pre-compute lowercase tokens for search
      tokens: clause.text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((t) => t.length > 2),
    });
  }
}

// Stop words to exclude from scoring
const STOP_WORDS = new Set([
  "the", "and", "for", "are", "but", "not", "you", "all",
  "can", "had", "her", "was", "one", "our", "out", "has",
  "his", "how", "its", "may", "new", "now", "old", "see",
  "way", "who", "did", "get", "let", "say", "she", "too",
  "use", "will", "with", "that", "this", "have", "from",
  "they", "been", "said", "each", "which", "their", "your",
  "what", "when", "make", "like", "time", "very", "than",
  "some", "them", "into", "just", "also", "more", "other",
  "any", "such", "shall", "must", "upon", "including",
]);

function searchClauses(query) {
  const queryTokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));

  if (queryTokens.length === 0) return CLAUSE_INDEX.slice(0, 5);

  // Score each clause
  const scored = CLAUSE_INDEX.map((clause) => {
    let score = 0;

    for (const qt of queryTokens) {
      // Exact token match
      const exactMatches = clause.tokens.filter((t) => t === qt).length;
      score += exactMatches * 3;

      // Partial match (starts with)
      const partialMatches = clause.tokens.filter(
        (t) => t.startsWith(qt) || qt.startsWith(t)
      ).length;
      score += partialMatches * 1.5;

      // Check if query token appears in raw text (catches multi-word terms)
      if (clause.text.toLowerCase().includes(qt)) {
        score += 2;
      }
    }

    // Boost for section title match
    const titleLower = clause.sectionTitle.toLowerCase();
    for (const qt of queryTokens) {
      if (titleLower.includes(qt)) score += 4;
    }

    // Boost for clause ID match (e.g., user asks about "clause 3.17")
    for (const qt of queryTokens) {
      if (clause.clauseId === qt || clause.clauseId.includes(qt)) {
        score += 10;
      }
    }

    return { ...clause, score };
  });

  // Sort by score descending, take top N
  scored.sort((a, b) => b.score - a.score);
  return scored
    .filter((c) => c.score > 0)
    .slice(0, CONFIG.maxContextClauses);
}

// ── Build Context for LLM ────────────────────────────────────
function buildContext(query) {
  const relevantClauses = searchClauses(query);

  if (relevantClauses.length === 0) {
    return "No specific clauses were found matching the query. The user may be asking about something not covered in the T&Cs.";
  }

  let context = "RELEVANT T&C CLAUSES:\n\n";
  for (const clause of relevantClauses) {
    context += `[Section ${clause.sectionNum}: ${clause.sectionTitle}] Clause ${clause.clauseId}:\n${clause.text}\n\n`;
  }

  return context;
}

let chatHistory = [];

// ── Pollinations API Client ──────────────────────────────────
async function* streamChat(userMessage) {
  // Combine the previous user message with the current one to maintain search context during follow-ups
  let searchQuery = userMessage;
  if (chatHistory.length >= 2) {
    const lastUserMessage = chatHistory[chatHistory.length - 2].content;
    searchQuery = `${lastUserMessage} ${userMessage}`;
  }

  const context = buildContext(searchQuery);

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...chatHistory,
    {
      role: "user",
      content: `Context from CitySport Terms & Conditions V3 (September 2025):\n\n${context}\n\n---\n\nUser Question: ${userMessage}`,
    },
  ];

  const response = await fetch(`${CONFIG.apiBase}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: CONFIG.model,
      messages,
      stream: true,
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data: ")) continue;

      const data = trimmed.slice(6);
      if (data === "[DONE]") return;

      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) yield content;
      } catch {
        // Skip malformed SSE chunks
      }
    }
  }
}

// ── UI Controller ────────────────────────────────────────────
const DOM = {
  welcome: document.getElementById("welcome"),
  messagesArea: document.getElementById("messages-area"),
  chatWrapper: document.querySelector(".chat-wrapper"),
  chatInput: document.getElementById("chat-input"),
  sendBtn: document.getElementById("send-btn"),
  quickActions: document.getElementById("quick-actions"),
  errorToast: document.getElementById("error-toast"),
};

let isStreaming = false;

// Auto-resize textarea
DOM.chatInput.addEventListener("input", () => {
  DOM.chatInput.style.height = "auto";
  DOM.chatInput.style.height =
    Math.min(DOM.chatInput.scrollHeight, 120) + "px";
});

// Enter to send (Shift+Enter for newline)
DOM.chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// Send button click
DOM.sendBtn.addEventListener("click", handleSend);

// Quick action clicks
DOM.quickActions.addEventListener("click", (e) => {
  const btn = e.target.closest(".quick-card");
  if (btn) {
    const query = btn.dataset.query;
    DOM.chatInput.value = query;
    handleSend();
  }
});

async function handleSend() {
  const message = DOM.chatInput.value.trim();
  if (!message || isStreaming) return;

  // Switch from welcome to chat view
  DOM.welcome.style.display = "none";
  DOM.messagesArea.classList.add("active");
  document.body.classList.add("chat-active");

  // Add user message
  appendMessage("user", message);

  // Clear input
  DOM.chatInput.value = "";
  DOM.chatInput.style.height = "auto";

  // Disable send
  isStreaming = true;
  DOM.sendBtn.disabled = true;

  // Add assistant message placeholder with typing indicator
  const assistantEl = appendMessage("assistant", null, true);
  const textEl = assistantEl.querySelector(".msg-text");

  try {
    let fullResponse = "";
    let typingRemoved = false;

    for await (const chunk of streamChat(message)) {
      if (!typingRemoved) {
        textEl.innerHTML = "";
        typingRemoved = true;
      }
      fullResponse += chunk;
      textEl.innerHTML = formatResponse(fullResponse) + '<span class="streaming-cursor"></span>';
      scrollToBottom();
    }

    // Final render without cursor
    textEl.innerHTML = formatResponse(fullResponse);

    // Append to history for conversational memory
    chatHistory.push({ role: "user", content: message });
    chatHistory.push({ role: "assistant", content: fullResponse });
    
    // Keep the last 10 pairs of messages (20 total) to prevent context explosion
    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(chatHistory.length - 20);
    }

    // Add copy button
    addMessageFooter(assistantEl, fullResponse);
  } catch (err) {
    console.error("Stream error:", err);
    textEl.innerHTML = `<span style="color: var(--red);">Sorry, something went wrong. Please try again.</span>`;
    showError(err.message);
  }

  isStreaming = false;
  DOM.sendBtn.disabled = false;
  DOM.chatInput.focus();
}

function appendMessage(role, content, isTyping = false) {
  const el = document.createElement("div");
  el.className = `message ${role}`;

  const avatarText = role === "user" ? "You" : "CS";
  const roleLabel = role === "user" ? "You" : "CitySport Assistant";

  let bodyContent = "";
  if (isTyping) {
    bodyContent = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>`;
  } else {
    bodyContent = role === "user" ? escapeHtml(content) : formatResponse(content);
  }

  el.innerHTML = `
    <div class="msg-inner">
      <div class="msg-avatar">${avatarText}</div>
      <div class="msg-body">
        <div class="msg-role">${roleLabel}</div>
        <div class="msg-text">${bodyContent}</div>
      </div>
    </div>`;

  DOM.messagesArea.appendChild(el);
  scrollToBottom();
  return el;
}

function addMessageFooter(messageEl, rawText) {
  const body = messageEl.querySelector(".msg-body");
  const footer = document.createElement("div");
  footer.className = "msg-footer";
  footer.innerHTML = `
    <button class="msg-action copy-btn" title="Copy to clipboard">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy
    </button>`;

  footer.querySelector(".copy-btn").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    try {
      await navigator.clipboard.writeText(rawText);
      btn.classList.add("copied");
      btn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!`;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy`;
      }, 2000);
    } catch {
      // Fallback
    }
  });

  body.appendChild(footer);
}

// ── Response Formatting ──────────────────────────────────────
function formatResponse(text) {
  if (!text) return "";

  let html = escapeHtml(text);

  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Clause references: Clause X.X or Clause X.X.X
  html = html.replace(
    /\b(Clause\s+\d+(?:\.\d+)*(?:\.\d+)?)/gi,
    `<a href="${CONFIG.tcUrl}" target="_blank" rel="noopener" class="clause-ref" title="View on CitySport website">§ $1</a>`
  );

  // Line breaks
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br>");

  // Wrap in paragraphs
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

  // Bullet points: lines starting with - or •
  html = html.replace(
    /(?:<br>|<\/p><p>)\s*[-•]\s+(.+?)(?=<br>|<\/p>|$)/g,
    '<br>• $1'
  );

  return html;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    DOM.chatWrapper.scrollTop = DOM.chatWrapper.scrollHeight;
  });
}

function showError(msg) {
  DOM.errorToast.textContent = msg;
  DOM.errorToast.classList.add("visible");
  setTimeout(() => {
    DOM.errorToast.classList.remove("visible");
  }, 5000);
}

// ── Initialise ───────────────────────────────────────────────
DOM.chatInput.focus();
console.log(
  "%c⚡ CitySport T&C Assistant loaded — " + CLAUSE_INDEX.length + " clauses indexed",
  "color: #c8102e; font-weight: bold; font-size: 14px;"
);
